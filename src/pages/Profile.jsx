import { useContext, useEffect, useState, } from 'react'
import { useForm } from "react-hook-form";
import UserOne from '../assets/userone.png';
import {  FaEnvelope, FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import { UserInfoContext } from '../UserContextInfo/UserInfo.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProfileImageUpdate from './ProfileImageUpdate.jsx';

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const Token = localStorage.getItem("Token");
  const { currentUser } = useContext(UserInfoContext);
  const { userName, email, phone, address, gender, profilePic } = currentUser || {};
  const [isChanged, setIsChanged] = useState(false);


  // const [updateImage, setUpdateImage] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      userName: userName || '',
      email: email || '',
      phone: phone || '',
      address: {
        city: address?.city || '',
        area: address?.area || '',
        district: address?.district || '',
        pinCode: address?.pinCode || '',
        state: address?.state || '',
        country: address?.country || '',
      },
      gender: {
        Male: gender?.Male || '',
        Female: gender?.Female || '',
        Other: gender?.Other || '',
      },
      profilePic: profilePic || '',
    },
  });



  useEffect(() => {
    setValue("userName", userName || '');
    setValue("email", email || '');
    setValue("phone", phone || '');
    setValue("address", address || '');
    setValue("gender", gender || '');
    setValue("profilePic", profilePic || '');
  }, [currentUser, setValue]);


  const handleChange = () => {
    setIsChanged(true);
  }
  
  const onSubmit = async (data) => {
    if (!isChanged) {
      toast.info("No Changes made!")
      return;
    }
    try {
      const response = await axios.put('http://localhost:8089/api/users/updateuser', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
    }
    catch (error) {
      console.log("Update error", error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="grid grid-cols-5 gap-8 w-[1140px] mx-auto py-5">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white dark:bg-[#1f2937] shadow-default dark:border-strokedark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2 mr-5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <div className="relative mb-6">
                    <FaUser size={20} className='absolute left-2 top-3.5 dark:text-black'/>
                    <input
                      className="w-full rounded border border-stroke px-11 bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary capitalize"
                      type="text"
                      name='userName'
                      id="userName"
                      {...register("userName")}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <div className="relative mb-6">
                    <FaPhone size={20} className='absolute left-2 top-3.5 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke pl-10 pr-5 bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary"
                      type="number"
                      name="phone"
                      id="phone"
                      {...register("phone")}
                      onChange={handleChange}

                    />
                  </div>
                  
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2 mr-5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope size={20} className='absolute top-4 left-2 dark:text-black'/>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="email"
                      name="email"
                      id="email"
                      {...register("email", {
                        required: "Email Address is required",
                        pattern: /^\S+@\S+$/i,
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        Enter a valid email address
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Gender
                  </label>
                  <select name="gender" id="gender" {...register("gender")} className=' w-full rounded border border-stroke bg-gray px-1 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary'>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-5">
                <div className="w-full sm:w-1/2 mr-5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="address"
                  >
                    City
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="address"
                      id="address"
                      {...register("address.city")}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="address"
                  >
                    Area
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="area"
                      id="area"
                      {...register("address.area")}
                      onChange={handleChange}

                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-5">
                <div className="w-full sm:w-1/2 mr-5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="district"
                  >
                    District
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="district"
                      id="district"
                      {...register("address.district")}
                      onChange={handleChange}

                    />
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="pinCode"
                  >
                    PinCode
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="pinCode"
                      id="pinCode"
                      {...register("address.pinCode")}
                      onChange={handleChange}

                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-5">
                <div className="w-full sm:w-1/2 mr-5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="state"
                      id="state"
                      {...register("address.state")}
                      onChange={handleChange}

                    />
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <div className="relative">
                    <FaLocationDot size={20} className='absolute top-4 left-2 dark:text-black' />
                    <input
                      className="w-full rounded border border-stroke bg-gray px-10 py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-black dark:focus:border-primary "
                      type="text"
                      name="country"
                      id="country"
                      {...register("address.country")}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4.5 mt-10">
                {isChanged ?
                  <button type="submit" className="border bg-blue-500 flex justify-center rounded bg-primary py-2 px-6 font-medium text-white text-lg hover:bg-opacity-90 hover:cursor-pointer dark:outline-none dark:border-none dark:hover:font-bold">
                  Update User</button> : ''
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5 xl:col-span-2">
        <ProfileImageUpdate/>
       
      </div>
    </div>
  );
}

export default Profile;
