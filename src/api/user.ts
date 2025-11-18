import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`;

const auth: any =
  typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("auth_store") as string);

const token: string = auth?.state?.token;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/profile`, { headers });
    return res.data;
  } catch (error: any) {
    // If profile endpoint doesn't exist, try alternative endpoints
    if (error?.response?.status === 404) {
      try {
        const res = await axios.get(`${url}/get-profile`, { headers });
        return res.data;
      } catch (err: any) {
        try {
          const res = await axios.get(`${url}/user`, { headers });
          return res.data;
        } catch (e: any) {
          return { success: false, message: "Profile endpoint not found" };
        }
      }
    }
    return error?.response?.data || { success: false, message: "Failed to fetch profile" };
  }
};
