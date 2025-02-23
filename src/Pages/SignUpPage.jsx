import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const SignupPage = () => {
    const { theme } = useTheme();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Sign Up Data:", data);
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 transition-all
            ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}
        >
            <div
                className={`w-full max-w-md shadow-lg rounded-2xl p-6 transition-all 
                ${theme === "dark" ? "bg-[var(--dark-border)] text-[var(--dark-text)]" : "bg-white text-gray-900"}`}
            >
                {/* Header */}
                <h2 className="text-3xl font-extrabold text-center">Create an Account</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Join us and start your journey today.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register("fullName", { required: "Full Name is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all 
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all 
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Must be at least 6 characters" },
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 font-medium rounded-lg shadow-md transition-all 
                        ${theme === "dark"
                                ? "bg-[var(--primary)] text-white hover:bg-opacity-90"
                                : "bg-blue-600 text-white hover:bg-blue-700"}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Already have an account? */}
                <div className="mt-5 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-[var(--primary)] hover:underline font-medium">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
