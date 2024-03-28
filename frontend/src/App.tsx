import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./pages/Navbar";

const isLogin = false;

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/blogs",
    element: <>
    <Navbar/>
    <Blogs/>
    </> 
  },
  {
    path: "/create",
    element: <>
      <Navbar/>
      <CreateBlog/>
    </>
  },
  {
    path: "/*",
    element: (!isLogin) ? <Signin /> : <Blogs />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
