import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import Blog from "../../assets/blog.png";
import { getAllBlogs } from "../../API/apiServices";
import SearchBar from "../SearchBar/SearchBar";

export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg shadow-lg p-6">
      <div className="bg-gray-300 h-48 w-full mb-4"></div>
      <div className="bg-gray-300 h-4 w-1/2 mb-2"></div>
      <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-300 h-4 w-1/2 "></div>
    </div>
  );
};

const BlogsCard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");



  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs();
        const formattedData = response.map((blog) => ({
          ...blog,
          image: blog.image.replace(/\\/g, "/"),
        }));
        setBlogData(formattedData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      getBlogs();
    }
  }, [token]);

  const filteredBlogs = searchKeyword
    ? blogData.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    : blogData;

  return (
    <>
      <div className="w-[1140px] mx-auto my-10">
        <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[1200px] mx-auto">
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
            <>
              {filteredBlogs.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500 dark:text-white">
                  No blogs found.
                </div>
              ) :
                filteredBlogs.map((blog) => {
                  const imageUrl = blog.image
                    ? `http://localhost:8089/${blog.image}`
                    : Blog;
                  return (
                    <article
                      key={blog._id}
                      className="relative overflow-hidden mb-4 rounded-lg border border-gray-100 bg-white shadow-md hover:scale-105 ease-in-out duration-300 hover:cursor-pointer mx-3 dark:bg-[#1f2937] dark:text-white dark:border-none"
                    >
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
              }
          </>
        )}
      </div>
    </>

  );
};

export default BlogsCard;
