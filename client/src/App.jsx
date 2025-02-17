// import { lazy, Suspense, useEffect } from "react";
// import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
// import { useAppStore } from "./store";
// import "./App.css";

// const Test = lazy(() => import("./screens/test"));
// const Home = lazy(() => import("./screens/home"));
// const Auth = lazy(() => import("./screens/auth"));
// const Profile = lazy(() => import("./screens/profile"));
// const History = lazy(() => import("./screens/history"));
// const Book = lazy(() => import("./screens/book"));
// const About = lazy(() => import("./screens/about"));
// const Actions = lazy(() => import("./screens/actions"));
// const Parkings = lazy(() => import("./screens/parkings"));
// const EditParking = lazy(() => import("./screens/editParking")); 
// const AddParking = lazy(() => import("./screens/addParking"));

// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/auth" />;
// };

// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? <Navigate to="/home" /> : children;
// };

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <ContentWrapper />
//         </Suspense>
//       </BrowserRouter>
//     </>
//   );
// };

// const ContentWrapper = () => {
//   const location = useLocation();

//   const isAuthPage = location.pathname === '/auth';

//   return (
//     <div className={isAuthPage ? "" : "content"}>
//       <Routes>
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/actions"
//           element={
//             <PrivateRoute>
//               <Actions />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/history"
//           element={
//             <PrivateRoute>
//               <History />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/book"
//           element={
//             <PrivateRoute>
//               <Book />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="*"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/parkings"
//           element={
//             <PrivateRoute>
//               <Parkings />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/auth"
//           element={
//             <AuthRoute>
//               <Auth />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <PrivateRoute>
//               <About />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/editParking"
//           element={
//             <PrivateRoute>
//               <EditParking/>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/addParking"
//           element={
//             <PrivateRoute>
//               <AddParking/>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/test"
//           element={
//             <AuthRoute>
//               <Test />
//             </AuthRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation"; // Import Navigation
import "./App.css";
import Grid2 from "@mui/material/Grid2";
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Grid2>Loading...</Grid2>}>
        <Navigation /> {/* Use Navigation component */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

