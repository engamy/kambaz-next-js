'use client';

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";  
import { useState, useEffect } from "react"; 
import { RootState } from "../../store";

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [profile, setProfile] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentUser) {
      // Ensure we copy all fields including _id
      const userAny = currentUser as any;
      setProfile({ ...userAny });
    } else {
      // If no currentUser, try to fetch profile from server
      const fetchProfile = async () => {
        try {
          const profile = await client.profile();
          if (profile) {
            dispatch(setCurrentUser(profile));
            setProfile(profile);
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
      
      // Ensure we have _id - get it from currentUser if missing in profile
      const currentUserAny = currentUser as any;
      const userId = profile._id || (profile as any).id || currentUserAny?._id || currentUserAny?.id;
      
      if (!userId) {
        setErrorMessage("User ID is missing. Please sign in again.");
        return;
      }
      
      // Ensure profile has _id before updating
      const profileToUpdate = { ...profile, _id: userId };
      
      const updatedProfile = await client.updateUser(profileToUpdate);
      dispatch(setCurrentUser(updatedProfile));
      setProfile(updatedProfile);
    } catch (error: any) {
      console.error("Update profile failed:", error);
      const message = 
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message || 
        `Update failed: ${error.response?.status ? `Status ${error.response.status}` : 'Unknown error'}`;
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
