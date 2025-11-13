import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.jsx";
import ErrorPage from "../Component/ErrorPage.jsx";
import Home from "../Component/Home.jsx";
import AllProducts from "../Pages/AllProducts";
import ProductDetails from "../Pages/ProductDetails";
import Login from "../Pages/Auth/Login.jsx";
import Register from "../Pages/Auth/Register.jsx";
import AddExport from "../Pages/AddExport";
import MyExports from "../Pages/MyExports";
import MyImports from "../Pages/MyImports.jsx";
import PrivateRoute from "../Routes/PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
        // loader: () => fetch("http://localhost:3000/products"), // optional
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        // loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: "/add-export",
        element: (
          <PrivateRoute>
            <AddExport />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-exports",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImports />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
