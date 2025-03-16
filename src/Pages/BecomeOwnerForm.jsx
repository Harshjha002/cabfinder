import { useForm } from "react-hook-form";
import { useTheme } from "../Context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router";

const BecomeOwnerForm = () => {
    const navigate = useNavigate()
    const { theme } = useTheme();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Become Owner Form Data:", data);
        try {
            const response = await axios.patch("http://localhost:8080/api/user/owner", data);
            console.log("Application submitted:", response.data);

            if (response.data.userId) {
                navigate(`/owner-dashboard/${response.data.userId}`);
            } else {
                console.error("User ID missing in response");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
        }
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
                <h2 className="text-3xl font-extrabold text-center">Become an Owner</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Fill in the details to apply as an owner.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Name Input */}
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Input */}
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

                    {/* Contact Number Input */}
                    <div>
                        <label className="block font-medium mb-1">Contact Number</label>
                        <input
                            type="tel"
                            {...register("contactNo", { required: "Contact number is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your contact number"
                        />
                        {errors.contactNo && (
                            <p className="text-red-500 text-sm mt-1">{errors.contactNo.message}</p>
                        )}
                    </div>

                    {/* Location Input */}
                    <div>
                        <label className="block font-medium mb-1">Location</label>
                        <input
                            type="text"
                            {...register("location", { required: "Location is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${theme === "dark"
                                    ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]"
                                    : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`}
                            placeholder="Enter your location"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 font-medium rounded-lg shadow-md transition-all 
                        ${theme === "dark"
                                ? "bg-[var(--primary)] text-white hover:bg-opacity-90"
                                : "bg-blue-600 text-white hover:bg-blue-700"}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? "Submitting..." : "Apply Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BecomeOwnerForm;
