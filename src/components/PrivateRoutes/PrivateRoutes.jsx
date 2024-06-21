import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setUser, logOutUser } from "../../redux/AuthSlice";
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthUser = useSelector((state) => state.auth.isAuthenticated);
  const Token = localStorage.getItem("Token");

  useEffect(() => {
    if (Token) {
      dispatch(setUser({ token: Token }));
    }
  }, [dispatch, Token]);

  useEffect(() => {
    const checkTokenExpiration = () => { 
       if (Token) {
         try {
           const decodedToken = jwtDecode(Token);
           const currentTime = Date.now() / 1000;
           if (decodedToken.exp < currentTime) {
             dispatch(logOutUser());
             localStorage.clear();
             navigate("/", { replace: true });
           }
         } catch (error) {
           console.error("Error decoding JWT token:", error);
         }
       } else {
         <Navigate to="/" />;
      }
     
    }
    checkTokenExpiration();
     const interval = setInterval(checkTokenExpiration, 60 * 1000);
     return () => clearInterval(interval); 
  }, [dispatch]);

  return <>{Token ? <Outlet /> : <Navigate to="/" replace={true} />}</>;
};

export default PrivateRoutes;
