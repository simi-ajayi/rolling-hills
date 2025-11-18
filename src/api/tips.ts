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

export const createTips = async ({ data }: { data: any }) => {
  try {
    const res = await axios.post(
      `${url}/create-tips`,
      { ...data },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getTips = async () => {
  try {
    const res = await axios.get(`${url}/get-tips`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    // Endpoint might not exist in backend, return empty data
    if (error?.response?.status === 404) {
      return { success: true, tips: { tipText: "" } };
    }
    return error?.response?.data || { success: false, tips: { tipText: "" } };
  }
};
