import React, {useEffect, useState} from 'react'
import { getAllNotifications } from '../../API/apiServices'

const GetNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getAllNotifications();
        if (Array.isArray(res.data.likeNotifications)) {
          setNotifications(res.data.likeNotifications );
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotifications();
  }, []);

  return (
    <>
      <div className='my-12 xl:w-[1140px] mx-auto w-full'>
        <h2 className='text-xl font-bold text-center'>Notifications</h2>
        <div className="header my-10">
          <div className="notifications text-xl text-black font-bold">
            {notifications.map((notification, index) => (
              <div
                key={notification?._id || index}
                className="notification-item text-xl text-black font-bold"
              >
                {notification.type === 'like'
                  ? `New like on your blog: ${notification?.blogTitle}`: ''}
                {notification.type === 'commentike'
                  ? `New Comment on your blog: ${notification?.blogTitle}`: ''}
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GetNotifications
