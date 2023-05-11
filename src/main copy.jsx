// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import './index.css'
// import SignIn from './Components/SignIn.jsx';
// import SignUp from './Components/SignUp.jsx';
// import Home from './Home.jsx';
// import Explore from './Components/Explore.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <>
//       {/* {!!localStorage.getItem("token") ? <Home /> : <SignIn />} */}
//       {/* <Navibar />
//       <Outlet />
//       <Footer /> */}
//       <SignIn />
//     </>,
//     // errorElement: <Page404 />,
//     // children: [
//     //   {
//     //     path: "/",
//     //     element: <TrendingMovie />,
//     //   },
//     //   {
//     //     path: "/TrendingTV",
//     //     element: <TrendingTV />,
//     //   },
//     //   {
//     //     path: "/signin",
//     //     element: <SignIn />,
//     //   }
//     // ],
//   },
//   {
//     path: "/Signin",
//     element: <SignIn />
//   },
//   {
//     path: "/Signup",
//     element: <SignUp />
//   },
//   {
//     path: "/home",
//     element: <Home />
//   },
//   {
//     path: "/explore",
//     element: <Explore />
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )

// // import React from "react";
// // import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// // import SignIn from "./Components/SignIn.jsx";
// // import SignUp from "./Components/SignUp.jsx";
// // import Home from "./Home.jsx";

// // const Main = () => {
// //   const isAuthenticated = !!localStorage.getItem("token");

// //   return (
// //     <Router>
// //       <Switch>
// //         <Route exact path="/">
// //           {isAuthenticated ? <Home /> : <SignIn />}
// //         </Route>
// //         <Route path="/Signup">
// //           <SignUp />
// //         </Route>
// //         <Route path="/Signin">
// //           <SignIn />
// //         </Route>
// //         <Route path="/home">
// //           {isAuthenticated ? <Home /> : <SignIn />}
// //         </Route>
// //       </Switch>
// //     </Router>
// //   );
// // };

// // export default Main;
