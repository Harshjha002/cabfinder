import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useUser } from "../Context/UserContext";

const SignInPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { login } = useUser();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/signin", data);

            if (response.data.token) {
                localStorage.setItem("sessionToken", response.data.token);
            }

            login(response.data);
            navigate(-1);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Sign-in failed. Try again.");
        }
    };

    const isDark = theme === "dark";
    const inputClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${isDark
            ? "bg-[#1B1A55] border-[#4D4C7D] text-white focus:ring-[var(--primary)]"
            : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"
        }`;

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 transition-all ${isDark ? "bg-[#070F2B] text-white" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div
                className={`w-full max-w-md shadow-lg rounded-2xl p-6 transition-all ${isDark ? "bg-[#1B1A55] text-white" : "bg-white text-gray-900"
                    }`}
            >
                <h2 className="text-3xl font-extrabold text-center">Welcome Back</h2>
                <p className="text-sm text-gray-400 text-center">Sign in to continue</p>

                {errorMessage && (
                    <p className="text-red-500 text-center mt-2 font-medium">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {[
                        { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
                        { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name}>
                            <label className="block font-medium mb-1">{label}</label>
                            <input
                                type={type}
                                {...register(name, { required: `${label} is required` })}
                                className={inputClasses}
                                placeholder={placeholder}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                            )}
                        </div>
                    ))}

                    <div className="text-right">
                        <Link to="/forgot-password" className="text-[var(--primary)] hover:underline text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 font-medium rounded-lg shadow-md transition-all ${isDark
                                ? "bg-[var(--primary)] text-white hover:bg-opacity-90"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-5 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="text-[var(--primary)] hover:underline font-medium">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
