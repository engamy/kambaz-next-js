'use client';

import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";  
import { useState, useEffect } from "react"; 
import { RootState } from "../../store";

interface User {
  _id?: string;
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  [key: string]: unknown;
}

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentUser) {
      // Ensure we copy all fields including _id
      const userData = currentUser as User;
      setProfile({ ...userData });
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
      setSuccessMessage(null);
      
      // Ensure we have _id - get it from currentUser if missing in profile
      const currentUserData = currentUser as User | null;
      const userId = profile._id || profile.id || currentUserData?._id || currentUserData?.id;
      
      if (!userId) {
        setErrorMessage("User ID is missing. Please sign in again.");
        return;
      }
      
      // Ensure profile has _id before updating
      // Remove password from update if it's empty (don't send empty password)
      // Keep _id for the URL, but server will get userId from URL params
      const { password, ...profileWithoutPassword } = profile;
      const profileToUpdate = { 
        ...profileWithoutPassword,
        _id: userId, // Required for client.updateUser to construct the URL
        ...(password && password.trim() !== "" ? { password } : {})
      };
      
      const updatedProfile = await client.updateUser(profileToUpdate);
      
      // Log the response for debugging
      console.log("Update profile response:", updatedProfile);
      
      // Check if we got a valid user response (has _id or id)
      if (updatedProfile && typeof updatedProfile === 'object' && (updatedProfile._id || updatedProfile.id)) {
        // Server returned valid user - use it
        dispatch(setCurrentUser(updatedProfile));
        setProfile(updatedProfile);
        setSuccessMessage("Profile updated successfully!");
      } else {
        // Server returned null or invalid response - try to refetch profile
        console.warn("Server returned invalid response, attempting to refetch profile");
        try {
          const refreshedProfile = await client.profile();
          console.log("Refetched profile:", refreshedProfile);
          if (refreshedProfile && (refreshedProfile._id || refreshedProfile.id)) {
            // Use the refreshed profile
            dispatch(setCurrentUser(refreshedProfile));
            setProfile(refreshedProfile);
            setSuccessMessage("Profile updated successfully!");
          } else {
            // Refetch failed, but update might have succeeded
            // Merge our updates with current user data as fallback
            const fallbackProfile = {
              ...currentUserData,
              ...profileToUpdate,
              _id: userId,
              id: userId
            };
            console.warn("Using fallback profile:", fallbackProfile);
            dispatch(setCurrentUser(fallbackProfile));
            setProfile(fallbackProfile);
            setSuccessMessage("Profile updated (changes may need a page refresh to verify)");
          }
        } catch (refreshError) {
          console.error("Failed to refetch profile:", refreshError);
          // Update might have succeeded, use our sent data as fallback
          const fallbackProfile = {
            ...currentUserData,
            ...profileToUpdate,
            _id: userId,
            id: userId
          };
          console.warn("Using fallback profile after refresh error:", fallbackProfile);
          dispatch(setCurrentUser(fallbackProfile));
          setProfile(fallbackProfile);
          setSuccessMessage("Profile updated (changes may need a page refresh to verify)");
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Update profile failed:", axiosError);
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
      {successMessage && (
        <div className="alert alert-success mb-2" role="alert">
          {successMessage}
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
