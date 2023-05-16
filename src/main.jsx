import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import MyProfile from './Pages/Profile/MyProfile';
import UserProfile from './Pages/Profile/UserProfile';
import UpdatePost from './Components/UpdatePost/UpdatePost';

const router = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem('token') ? <Home /> : <SignIn />
  },
  {
    path: "/Signin",
    element: <SignIn />
  },
  {
    path: "/Signup",
    element: <SignUp />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/explore",
    element: <Explore />
  },
  {
    path: "/myprofile",
    element: <MyProfile />
  },
  {
    path: "/profile/:userID",
    element: <UserProfile />
  },
  {
    path: "/updatepost/:postID",
    element: <UpdatePost />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
