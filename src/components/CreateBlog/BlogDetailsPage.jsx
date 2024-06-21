import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { FaCalendar, FaHeart, FaThumbsUp, FaUser } from 'react-icons/fa';
import { likeBlog, commentOnBlog, getSingleBlogComments, getMyBlogs, deleteSingleComment } from '../../API/apiServices';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const BlogDetailsPage = () => {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState();
  const { blog } = location.state || {};
  const { title, image, content, createdAt, } = blog;
  let blogId = blog._id;

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  const handleAddComment = async (blogId) => {
      try {
        const res = await commentOnBlog(blogId, { content: newComment });
        setNewComment('');
        await fetchComments(blogId);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
  }

  const getInfo = async () => {
    try {
      const res = await getMyBlogs();
      const likesCounts = res.map(item => item?.likesCount);
      setLikes(likesCounts);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (blogId) {
      fetchComments(blogId);
    }
    getInfo()
  }, [blog, likes]);

  const fetchComments = async (blogId) => {
    try {
      const response = await getSingleBlogComments(blogId);
      setComments(response.data|| []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const handleLike = async (blogId) => {
    try {
      await likeBlog(blogId);
    } catch (error) {
      toast.info(error.res.message);
    }
  }
  
  const handleDeleteComment = async (commentId, blogId) => {
    try {
      await deleteSingleComment(commentId, blogId);
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  return (
    <>
      <div className='w-[1140px] mx-auto h-full mt-10 mb-8 dark:text-white'>
        <img src={`http://localhost:8089/${image}`} onError={(e) => {
          e.target.onerror = null;
          e.target.src = blog;
        }} alt='image' className=' object-center w-[100%]' />
        <div className='mt-10'>
          <div className='flex justify-between mx-2.5'>
            <div className='flex justify-start mb-3'>
             <span className="flex items-center text-sm capitalize dark:text-white">
                <FaCalendar size={15} className='text-blue-500 mx-1 text-sm' /> {moment(createdAt).format("D MMM YYYY")}
              </span>
              <span className='ml-4 flex items-center text-sm text-gray-700 font-notmal cursor-pointer'><FaUser size={15} className='text-gray-500 mr-2 '/> Admin</span>
            </div>
            <div className='flex justify-end items-center'>
              <FaThumbsUp size={20} className=' cursor-pointer' onClick={() => handleLike(blogId)} />
              <span className='flex mx-2.5'>Likes: {likes}</span>
              <span className='flex mx-2.5 cursor-pointer'>Comments:{comments.length}</span>
            </div>
          </div>  
          <div className='mx-2.5 mb-12 '>
            <h3 className='text-2xl font-bold capitalize'>{title}</h3>
            <p className='text-gray-500 text-lg'>{content}</p>
          </div>
        </div>
        <div className='my-2' id='commnets'>
          <h2 className='text-xl font-bold text-blue-700 capitalize mb-2'>Comments:</h2>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment, index) => (
            <div key={comment?._id || index} className="border-b border-gray-200 py-2 mt-5 relative">
              <FaTrashCan size={20} className='absolute right-5 top-5 text-red-500 cursor-pointer' onClick={() => handleDeleteComment(comment?._id, blogId)} />
              <p className="font-bold text-blue-400 capitalize leading-6">{comment?.username}</p>
              <p className='text-black font-normal capitalize leading-6'>{comment?.content}</p>
              <p className="text-gray-500 text-sm leading-6">
                {moment(comment?.createdAt).format('Do MMMM YYYY, h:mma')}
              </p>
            </div>
          )))}

        </div>
        <div className='mt-5'>
          <h2 className='text-xl text-gray-700 font-bold mb-2'>Add a Comment</h2>
          <textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full h-[120px] rounded-md outline-none"
          ></textarea>
          <button
            onClick={() => handleAddComment(blogId)}
            className={`bg-blue-500 text-white px-4 py-2 mt-2 rounded-md ${newComment.trim().length === 0? 'hidden': 'block'}`}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default BlogDetailsPage
