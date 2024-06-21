// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const useBlogForm = (initialValues = {}, url) => {
//   const Token = localStorage.getItem("Token");
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm({ defaultValues: initialValues });
//   const [updateImage, setUpdateImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     reset(initialValues);
//     if (initialValues.image) {
//       setImagePreview(
//         `http://localhost:8089/${initialValues.image.replace(/\\/g, "/")}`
//       );
//     }
//   }, [initialValues, reset]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!validTypes.includes(file.type)) {
//         toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
//         return;
//       }
//       setUpdateImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // Clear image preview if no file is selected
//       setImagePreview(null);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const { title, content } = data;
//       if ((!title || !content)) {
//         return toast.error("All fields are required");
//       }
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       if (updateImage) {
//         formData.append("image", updateImage);
//       }

//       const response = await axios({
//         method,
//         url,
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${Token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success(response.data.message);
//       navigate("/home");
//       reset();
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     errors,
//     handleFileChange,
//     onSubmit,
//     imagePreview,
//     setValue,
//   };
// };

// export default useBlogForm;
