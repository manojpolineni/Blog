import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8089/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config )=> {
    const Token = localStorage.getItem('Token');
    if (Token) {
        config.headers.Authorization= `Bearer ${Token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


// All User Request

//SignUp Request
export const userSignUp = async () => {
    try {
        const res = await api.post("/users/register", data);
        toast.success(res.data.message);

    } catch (error) {
        toast.error(error);
    }
}

//Login Request
export const userLogin = async () => {
    try {
        const res = await api.post('/users/login', data);
        toast.success(res.data.message);

    } catch (error) {
        toast.error(error);
    }
}

//getSingleUser Request
export const getSingleUser = async () => {
    try {
        const res = await api.get("/users/user");
        toast.success(res.data.message);

    } catch (error) {
        toast.error(error);
    }
}
//updateuser Request
export const updateUser = async () => {
  try {
    const res = await api.get("/users/updateuser", data);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error);
  }
};

//Blogs Requests
//Create Blog Request 
export const createBlog = async () => {
    try {
        const res = await api.post('/blogs/createblog', data);
        toast.success(res.data.message);
    } catch (error) {
        toast.error(error.message)
    }
}


//get All Blogs based on user ID
export const getMyBlogs = async () => {
    try {
      const res = await api.get("/blogs/userblogs");
        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
        throw error; 
    }
}


//Delete single Blog
export const deleteBlog = async (blogId) => {
  try {
    const res = await api.delete(`/blogs/deleteblog/${blogId}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
    throw error;
  }
};


//Get Request
export const getAllBlogs = async() => {
    try {
        const res = await api.get('/blogs');
        return res.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error
    }
}

//Like a Blog Api
export const likeBlog = async (blogId) => {
    try {
        const res = await api.post(`/blogs/like/${blogId}`);
        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        toast.info(
          error.response ? error.response.data.message : error.message
        );
        throw error;
    }
}

//Comment on Single Blog Api 
export const commentOnBlog = async (blogId, commentData) => {
  try {
      const res = await api.post(`/blogs/addcomment/${blogId}`, commentData);
      toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
    throw error;
  }
};

//get Comments on single Blog
export const getSingleBlogComments = async (blogId) => {
    try {
        const res = await api.get(`/blogs/getsingleblogcomments/${blogId}`);
        return res;
    } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
        throw error;
    }
}

//Delete Blog Single Comment
export const deleteSingleComment = async (commentId, blogId) => {
  try {
      const res = await api.delete(`/blogs/deletesinglecomment/${commentId}/${blogId}`);
      return res;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
    throw error;
  }
};

//Get Notifications for likes and Comments
export const getAllNotifications = async () => {
    try {
        const res = await api.get(`/blogs/notifications`);
        toast.success(res.data.message);
        return res;
    } catch (error) {
        toast.error(error.response ? error.response.data.message : error.message)
        throw error;
    }
}