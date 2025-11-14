// Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.jsx";
import ErrorPage from "../Component/ErrorPage.jsx";
import Home from "../Component/Home.jsx";
import AllProducts from "../Pages/AllProducts.jsx";
import ProductDetails from "../Pages/ProductDetails.jsx";
import Login from "../Pages/Auth/Login.jsx";
import Register from "../Pages/Auth/Register.jsx";
import AddExport from "../Pages/AddExport.jsx";
import MyExports from "../Pages/MyExports.jsx";
import MyImports from "../Pages/MyImports.jsx";
import PrivateRoute from "../Routes/PrivateRoute.jsx";

const API_BASE = "http://localhost:3000"; // backend URL

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
        loader: async () => {
          const res = await fetch(`${API_BASE}/products`);
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        },
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`${API_BASE}/products/${params.id}`);
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        },
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
