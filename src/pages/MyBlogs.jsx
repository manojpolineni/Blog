import React, { useEffect, useState } from 'react'
import { getMyBlogs, deleteBlog } from '../API/apiServices'
import { SkeletonLoader } from '../components/Blog/BlogsCard';
import Blog from '../assets/blog.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import DeleteModal from "../components/ModalPopup/DeleteModal.jsx";
import { toast } from 'react-toastify';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getMyBlogs();
        setBlogs(data || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBlogIdToDelete(null);
  }

  const handleDeleteClick = (blogId) => {
    setBlogIdToDelete(blogId);
    setIsModalOpen(true);
  };

  const handleDeletBlog = async () => {
    if (!blogIdToDelete) return;
    try {
      const res = await deleteBlog(blogIdToDelete);
      setBlogs(blogs.filter((blogid) => blogid._id !== blogIdToDelete))

    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsModalOpen(false);
      setBlogIdToDelete(null);
    }
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {blogs.length === 0 ? <p className='h-[200px] mt-2.5 flex justify-center items-center text-center text-xl font-bold'>No Blogs Created</p> : <>
        <h2 className='text-xl font-bold text-center flex justify-center mx-auto mt-10'>My Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[1200px] mx-auto my-12">
          {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
              
            blogs.map((blog) => {
              const imageUrl = blog.image
                ? `http://localhost:8089/${blog.image}`
                : Blog;
              return (
                <article
                  key={blog._id}
                  className="group relative overflow-hidden mb-4 rounded-lg border border-gray-100 bg-white shadow-md hover:scale-105 ease-in-out duration-300 hover:cursor-pointer mx-3 dark:bg-[#1f2937] dark:text-white dark:border-none"
                >
                  <FaPenToSquare size={20} className='absolute right-2.5 top-2.5 cursor-pointer text-white dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out' onClick={() => handleUpdateBlog(blog)} />
                  <FaTrash size={20} className='absolute left-2.5 top-2.5 cursor-pointer text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out' onClick={() => handleDeleteClick(blog._id)} />

                  <img
                    alt="blog-img"
                    src={imageUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Blog;
                    }}
                    className="md:h-[250px] md:w-full object-center w-[100%]"
                  />
                  <div className="p-4 sm:p-6">
                    <span className="text-sm font-normal text-gray-500 dark:text-white">
                      {moment(blog.createdAt).format("Do MMM YYYY")}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900 capitalize dark:text-white">
                      {blog.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-white">
                      {blog.content}
                    </p>
                    <Link to={`/blogdetails`} state={{ blog }} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-white"
                    >
                      Read More
                      <span
                        aria-hidden="true"
                        className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })
          )}
          <DeleteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleDeletBlog}
            title="Confirm Delete"
            message="Are you sure you want to delete this blog?"
          />
        </div>
      </>}
      
    </>
  )
}

export default MyBlogs;
