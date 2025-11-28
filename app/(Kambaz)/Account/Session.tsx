"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";

interface AxiosError {
  response?: {
    status?: number;
  };
}

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        dispatch(setCurrentUser(null));
      } else {
        console.error(err);
      }
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, [dispatch]);
  if (!pending) {
    return <>{children}</>;
  }
  return null;
}
