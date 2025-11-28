'use client';

import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import type { User } from "../client";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";  
import { useState, useEffect } from "react"; 
import { RootState } from "../../store";

interface AxiosError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [profile, setProfile] = useState<User>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentUser) {
      const user = currentUser as User;
      setProfile({ ...user });
    } else {
      const fetchProfile = async () => {
        try {
          const fetchedProfile = await client.profile();
          if (fetchedProfile) {
            dispatch(setCurrentUser(fetchedProfile));
            setProfile(fetchedProfile);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      };
      fetchProfile();
    }
  }, [currentUser, dispatch]);
  
  const updateProfile = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setErrorMessage(null);
      
      const currentUserTyped = currentUser as User | null;
      const userId = profile._id || profile.id || currentUserTyped?._id || currentUserTyped?.id;
      
      if (!userId) {
        setErrorMessage("User ID is missing. Please sign in again.");
        return;
      }
      
      const profileToUpdate: User = { ...profile, _id: userId };
      
      const updatedProfile = await client.updateUser(profileToUpdate);
      dispatch(setCurrentUser(updatedProfile));
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Update profile failed:", error);
      const axiosError = error as AxiosError;
      const message = 
        axiosError.response?.data?.message || 
        axiosError.response?.data?.error ||
        axiosError.message || 
        `Update failed: ${axiosError.response?.status ? `Status ${axiosError.response.status}` : 'Unknown error'}`;
      setErrorMessage(message);
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Profile</h1>
      {errorMessage && (
        <div className="alert alert-danger mb-2" role="alert">
          {errorMessage}
        </div>
      )}
      
      <FormControl 
        value={profile.username || ""} 
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        placeholder="username"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={profile.password || ""} 
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        placeholder="password" 
        type="password" 
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={profile.firstName || ""} 
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        placeholder="First Name"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={profile.lastName || ""} 
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        placeholder="Last Name"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={profile.dob || ""} 
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        type="date"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={profile.email || ""} 
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        type="email"
        placeholder="email"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        as="select" 
        value={profile.role || "USER"}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        className="mb-4"
        suppressHydrationWarning
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl>
      
      <Button onClick={updateProfile} variant="primary" className="w-100 mb-2"> 
        Update 
      </Button>
      <Button 
        onClick={() => {
          dispatch(setCurrentUser(null));
          window.location.href = "/Account/Signin";
        }} 
        variant="danger" 
        className="w-100"
      >
        Signout
      </Button>
    </div>
  );
}
