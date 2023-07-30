import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Chat /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "setAvatar",
        element: <SetAvatar />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
