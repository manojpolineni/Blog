import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyBlogs from './pages/MyBlogs';
import ContactUs from './pages/ContactUs';
import Login from './components/Authentication/Login';
import CreateBlogCard from './components/CreateBlog/CreateBlog';
import SignUp from './components/Authentication/SignUp';
import BlogDetailsPage from './components/CreateBlog/BlogDetailsPage';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import GetNotifications from './components/Notifications/getNotifications';
import { useSelector } from 'react-redux';
import Todos from './components/Todos/Todos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const AuthUser = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <ToastContainer />
      {AuthUser && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/createblog" element={<CreateBlogCard />} />
          <Route path="/blogdetails" element={<BlogDetailsPage />} />
          <Route path="/notifications" element={<GetNotifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        {/* Handle Invalid  Routes */}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

      {AuthUser && <Footer />}
    </>
  );
}

export default App;
