"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

interface AxiosError {
  response?: {
    status?: number;
  };
}

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      const axiosError = err as AxiosError;
      // If user is not logged in (401/403), set currentUser to null
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        dispatch(setCurrentUser(null));
      } else {
        // Only log unexpected errors
        console.error(err);
      }
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!pending) {
    return <>{children}</>;
  }
  return null;
}
