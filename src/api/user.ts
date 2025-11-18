import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`;

// Helper function to get auth token
const getAuthToken = (): string => {
  if (typeof window === "undefined") return "";
  try {
    const authStore = localStorage.getItem("auth_store");
    if (!authStore) return "";
    const auth = JSON.parse(authStore);
    return auth?.state?.token || "";
  } catch (error) {
    console.error("Error reading auth token:", error);
    return "";
  }
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/profile`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    // If profile endpoint doesn't exist, try alternative endpoints
    if (error?.response?.status === 404) {
      try {
        const res = await axios.get(`${url}/get-profile`, { headers: getHeaders() });
        return res.data;
      } catch (err: any) {
        try {
          const res = await axios.get(`${url}/user`, { headers: getHeaders() });
          return res.data;
        } catch (e: any) {
          return { success: false, message: "Profile endpoint not found" };
        }
      }
    }
    return error?.response?.data || { success: false, message: "Failed to fetch profile" };
  }
};
