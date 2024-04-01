import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreatePost";
import Navbar from "./pages/Navbar";
import Blog from "./pages/Blog";
import { RecoilRoot } from "recoil";

const isLogin = document.cookie;
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
      <Navbar />
      <Blogs />
    </>
  },
  {
    path: "/blog/:id",
    element: <>
      <Navbar />
      <Blog />
    </>
  },
  {
    path: "/create",
    element: <>
      <Navbar />
      <CreateBlog />
    </>
  },
  {
    path: "/*",
    element: (!isLogin)
      ?
      <Signin />
      :
      <>
        <Navbar />
        <Blogs />
      </>
  }
])

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
