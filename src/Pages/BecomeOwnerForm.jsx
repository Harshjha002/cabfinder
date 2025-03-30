import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { useUser } from "../Context/UserContext";

const BecomeOwnerForm = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user } = useUser();
    const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
    const [imageData, setImageData] = useState(user?.profileImage || "");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.contact || "",
            location: user?.location || "",
            imageURL: user?.profileImage || "",
        },
    });

    useEffect(() => {
        if (user) {
            setValue("name", user.name || "");
            setValue("email", user.email || "");
            setValue("contact", user.contact || "");
            setValue("location", user.location || "");
            setValue("imageURL", user.profileImage || "");
        }
    }, [user, setValue]);

    const inputClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
    ${theme === "dark" ? "bg-[var(--dark-bg)] border-[var(--dark-border)] text-white focus:ring-[var(--primary)]" : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500"}`;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImageData(reader.result);
                setValue("imageURL", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        if (!user) {
            setErrorMessage("User must be logged in.");
            return;
        }

        const formData = {
            name: data.name,
            email: data.email,
            contact: data.contact,
            location: data.location,
            imageURL: imageData,
        };

        try {
            const response = await axios.patch(`http://localhost:8080/api/user/owner/${user.id}`, formData);
            if (response.status === 200) {
                navigate(`/owner-dashboard/${user.id}`);
            } else {
                setErrorMessage("Unexpected response from server.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to submit application.");
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-all ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}>
            <div className={`w-full max-w-md shadow-lg rounded-2xl p-6 transition-all ${theme === "dark" ? "bg-[var(--dark-border)] text-[var(--dark-text)]" : "bg-white text-gray-900"}`}>
                <h2 className="text-3xl font-extrabold text-center">Become an Owner</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Fill in the details to apply as an owner.</p>
                {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {["name", "email", "contact", "location"].map((field) => (
                        <div key={field}>
                            <label className="block font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type={field === "email" ? "email" : "text"} {...register(field, { required: `${field} is required` })} className={inputClasses} />
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>}
                        </div>
                    ))}

                    <div>
                        <label className="block font-medium mb-1">Profile Picture</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" className="file-input w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300 text-gray-900" />
                        {imagePreview && (
                            <div className="mt-3 flex justify-center">
                                <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full border-2 border-[var(--primary)] shadow-md" />
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting} className={`w-full py-2 font-medium rounded-lg shadow-md transition-all ${theme === "dark" ? "bg-[var(--primary)] text-white hover:bg-opacity-90" : "bg-blue-600 text-white hover:bg-blue-700"} disabled:opacity-50 disabled:cursor-not-allowed`}>
                        {isSubmitting ? "Submitting..." : "Apply Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BecomeOwnerForm;