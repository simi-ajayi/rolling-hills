import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URI}`;
const auth: any =
  typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("auth_store") as string);

const token: string = auth?.state?.token;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const createTips = async ({ data }: { data: any }) => {
  try {
    const res = await axios.post(
      `${url}/create-tips`,
      { ...data },
      { headers }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getTips = async () => {
  try {
    const res = await axios.get(`${url}/get-tips`, { headers });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
