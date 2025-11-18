"use client";
import { getUser } from "@/api/user";
import { useProfile } from "@/app/states/profile";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const useProfileData = () => {
  const { token, isAuthenticated } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: "Profile",
    enabled: !!token && isAuthenticated, // Only fetch if we have a token
    retry: false, // Don't retry if it fails
    refetchOnWindowFocus: false,
  });
  
  const profile = data?.profile as Profile;

  // Don't update authentication state based on profile fetch
  // The token in localStorage is the source of truth
  // Profile fetch is optional and shouldn't affect auth state

  return {
    profile,
    isLoading,
  };
};

export default useProfileData;
