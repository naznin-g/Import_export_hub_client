import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../Firebase/firebase.config";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to save user info to backend
  const saveUserToBackend = async (userData) => {
    try {
      const token = await auth.currentUser.getIdToken();
      localStorage.setItem("access-token", token);

      await fetch("${API_BASE}/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.error("Failed to save user to backend:", err);
    }
  };

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      await saveUserToBackend({
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "importer",
      });

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await saveUserToBackend({
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "importer",
      });

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-4 text-center">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary w-full flex justify-center items-center gap-2"
        disabled={loading}
      >
        <FaGoogle /> Login with Google
      </button>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
