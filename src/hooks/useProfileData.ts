"use client";
import { getUser } from "@/api/user";
import { useProfile } from "@/app/states/profile";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const useProfileData = () => {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: "Profile",
  });
  const { setAuthenticated } = useProfile();

  const profile = data?.profile as Profile;

  useEffect(() => {
    if (profile) {
      setAuthenticated({ value: true });
    } else {
      setAuthenticated({ value: false });
    }
  }, [profile, setAuthenticated]);

  return {
    profile,
    isLoading,
  };
};

export default useProfileData;
