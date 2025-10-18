import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-base-100 overflow-hidden">
      {/* Left Side - Form */}
      <motion.div
        className="flex flex-col justify-center items-center p-8 sm:p-12 relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md space-y-8 backdrop-blur-md bg-base-200/40 p-8 rounded-2xl shadow-lg border border-base-300"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex flex-col items-center gap-2 group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="text-3xl font-bold mt-3 text-base-content">
                Welcome Back 👋
              </h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  required
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isLoggingIn}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium">
                Create account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Animated Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;