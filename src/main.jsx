import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/Store.js";
import { Provider } from "react-redux";
import UserInfoProvider from "./UserContextInfo/UserInfo.jsx";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider.jsx";
// import UserProfileProvider from "./UserContextInfo/userProfilePic.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserInfoProvider>
        {/* <UserProfileProvider> */}
          <Router>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </Router>
        {/* </UserProfileProvider> */}
      </UserInfoProvider>
    </Provider>
  </React.StrictMode>
);
