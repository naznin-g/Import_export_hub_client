import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../Firebase/firebase.config";

const Register = () => {
  const { createUser, googleLogin, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation
  const isValidPassword = (pass) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasLength = pass.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  // Save user to backend (MongoDB)
  const saveUserToBackend = async (userData) => {
    try {
      const token = await auth.currentUser.getIdToken(); // Firebase ID token

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to backend");
      }
    } catch (err) {
      console.error("Backend save error:", err);
    }
  };

  // Email/Password registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      return toast.error(
        "Password must be at least 6 characters with uppercase and lowercase letters."
      );
    }

    setLoading(true);
    try {
      // 1️⃣ Create user in Firebase
      const result = await createUser(email, password);

      // 2️⃣ Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      // 3️⃣ Save user info to backend (MongoDB)
      await saveUserToBackend({
        name,
        email,
        photoURL,
        role: "importer", // default role
      });

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google registration/login
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
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
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input input-bordered w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="my-4 text-center">OR</div>

      <button
        onClick={handleGoogleRegister}
        className="btn btn-outline btn-primary w-full flex justify-center items-center gap-2"
        disabled={loading}
      >
        <FaGoogle /> Register with Google
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
