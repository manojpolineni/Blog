import { useEffect, useState, useContext, createContext} from 'react'
import { FaArrowUpFromBracket } from 'react-icons/fa6';
import axios from 'axios';
import { useForm } from "react-hook-form";
import UserOne from '../assets/userone.png';
import { toast } from 'react-toastify';
import { UserInfoContext } from '../UserContextInfo/UserInfo';


export const ProfilePicLoader = () => {
    return (
        <div className="animate-pulse bg-gray-200 h-32 w-32 rounded-full object-cover shadow-lg p-6"></div>
    );
};

const ProfileImageUpdate = () => {
    const Token = localStorage.getItem("Token");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(true);
    const { formState: { errors } } = useForm()
    const [updateImage, setUpdateImage] = useState(null);
    const { currentUser, updateUserInfo } = useContext(UserInfoContext);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdateImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('profilePic', updateImage);
            const response = await axios.put('http://localhost:8089/api/users/profileImage', formData, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            updateUserInfo(response.data);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error:', error.response);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8089/api/users/getprofileimg`, {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                    responseType: 'blob',
                });
                const image = URL.createObjectURL(response.data);
                setImageURL(image);
                setLoading(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchProfileImage();
        // Cleanup function to revoke URL when component unmounts
        return () => {
            URL.revokeObjectURL(imageURL);
        };
    }, [Token]);
    
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white dark:bg-[#1f2937] shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Your Photo
                    </h3>
                </div>
                <div className="p-7">
                    <div className="mb-4 flex items-center gap-3">
                        {loading ? <ProfilePicLoader /> :
                            <>
                                <div className="h-32 w-32 rounded-full object-center">
                                    {imagePreview ?
                                        <img src={imagePreview} alt="Preview" className=' rounded-full object-center h-full w-full object-cover' /> :
                                        <img src={imageURL ? imageURL : UserOne} alt='userPic' className='rounded-full h-full w-full object-center object-cover' />
                                    }
                                </div>
                            </>
                        }
                        
                        <div>
                            <span className="mb-1.5 text-black dark:text-white">
                                Edit your photo
                            </span>
                            <span className="flex gap-2.5 mt-2">
                                <button className=" hover:text-primary text-ms">
                                    Delete
                                </button>
                                <button className="text-sm hover:text-primary" onChange={handleFileChange}>
                                    Update
                                </button>
                            </span>
                        </div>
                    </div>

                    <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            onChange={handleFileChange}
                        />


                        <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                <FaArrowUpFromBracket size={20} className='text-[#0095da] object-cover object-center font-light dark:text-black' />
                            </span>
                            <p>
                                <span className="text-primary">Click to upload</span> or
                                drag and drop
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                        </div>
                    </div>
                    {errors.profilePic && <span className="text-red-500 text-sm">{errors.profilePic.message}</span>}

                    <div className="flex justify-around gap-4.5 mt-5">
                        <button
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 bg-blue-500"
                            type="submit"
                            onClick={handleImageSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileImageUpdate
