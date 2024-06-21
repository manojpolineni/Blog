import { useForm } from 'react-hook-form';
// import useBlogForm from '../../CustomHooks/useBlogForm';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlogCard = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem('Token');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [updateImage, setUpdateImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
          return;
        }
        setUpdateImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Clear image preview if no file is selected
        setImagePreview(null);
      }
    };
  
  const onSubmit = async (data) => {
    try {
      const { title, content } = data;
      if ((!title || !content)) {
        return toast.error("All fields are required");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (updateImage) {
        formData.append("image", updateImage);
      }
      const response = await axios.post('http://localhost:8089/api/blogs/createblog', formData, {
          headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
        },}
      );
      toast.success(response.data.message);
      navigate("/home");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };


  return (
    <div className='xl:w-[1000px] max-xl:mx-auto mx-auto px-2.5 py-10 w-auto'>
      <h2 className='text-center text-xl capitalize font-medium pb-10'>create a blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='border rounded-md p-6'>
        <div className='mb-5.5 max-lg:flex-col mx-auto flex justify-center flex-col gap-5.5 sm:flex-col'>
          <div className="xl:w-full sm:w-1/2 mr-5">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="fullName"
            >Title </label>
            <div className="relative mb-6">
              <input
                className="w-full rounded border border-stroke px-2.5 bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary capitalize"
                type="text"
                placeholder='Enter Title'
                {...register("title", { required: 'Title is Required' })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  Title is Required Field! 
                </span>
              )}
            </div>
          </div>
          <div className="xl:w-full sm:w-1/2 mr-5">
            <label
              className="mb-2 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Content
            </label>
            <div className="relative mb-6">
              <textarea
                className="w-full rounded border border-stroke px-2.5 bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary capitalize"
                type="text"
                {...register("content", { required: 'Content is Required' })}
              />
              {errors.content && (
                <span className="text-red-500 text-sm">
                  Content is Required Field!
                </span>
              )}
            </div>
          </div>

          <div className="xl:w-full sm:w-1/2 mr-5">
            <label
              className="mb-2 block capitalize text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Image
            </label>
            <div className="relative mb-6 cursor-pointer">
              <input
                className="w-full rounded border-stroke px-2.5 bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary capitalize cursor-pointer"
                type="file"
                accept="image/*"
                {...register("image", { required: 'Image is Required' })}
                onChange={handleFileChange}
              />
              <p className='dark:text-white'>Fiel allows only jpg, png, gif.</p>
              {errors.image &&(
                <span className="text-red-500 text-sm">
                  Image is Required!
                </span>
              )}
            </div>
          </div>
          {imagePreview && <img src={imagePreview} alt="Preview" className=' rounded-full object-center h-32 w-32' />}
        </div>
        <div className="flex justify-around gap-4.5 mt-5">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 bg-blue-500"
            type="submit"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogCard
