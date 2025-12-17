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

export const getAllPost = async ({
  search,
  category,
  page,
}: {
  search?: string;
  category?: string;
  page?: number;
}) => {
  try {
    console.log("get All", search, category);
    const res = await axios.get(
      `${url}/get-all-post/?search=${search || ""}&category=${
        category || ""
      }&page=${page || 1}`
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getOwnerPost = async () => {
  try {
    const res = await axios.get(`${url}/get-my-post`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
// export const getTrendingPost = async () => {
//   try {
//     const res = await axios.get(`${url}/get-trending-post`, { headers: getHeaders() });
//     return res.data;
//   } catch (error: any) {
//     // Endpoint might not exist in backend, return empty data
//     if (error?.response?.status === 404) {
//       return { success: true, posts: [] };
//     }
//     return error?.response?.data || { success: false, posts: [] };
//   }
// };

export const getTrendingPost = async (id: string) => {
  try {
    const res = await axios.get(`${url}/get-trending-post`);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const createPost = async (data: any) => {
  try {
    const res = await axios.post(
      `${url}/create-post`,
      { ...data },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const editPost = async ({ id, data }: { id: string; data: any }) => {
  try {
    const res = await axios.put(
      `${url}/edit-my-post/${id}`,
      { ...data },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const deletePost = async ({ id }: { id: string }) => {
  try {
    const res = await axios.delete(`${url}/delete-my-post/${id}`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(`${url}/get-post/${id}`);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const likePost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.put(`${url}/like-post`, { postId }, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const commentOnPost = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  try {
    const res = await axios.put(
      `${url}/comment-post`,
      { postId, comment },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const savePost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.put(`${url}/save-post`, { postId }, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const getSavedPost = async () => {
  try {
    const res = await axios.get(`${url}/get-save-post`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const getTopPost = async () => {
  try {
    const res = await axios.get(`${url}/top-post`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    // Endpoint might not exist in backend, return empty data
    if (error?.response?.status === 404) {
      return { success: true, posts: [] };
    }
    return error?.response?.data || { success: false, posts: [] };
  }
};
