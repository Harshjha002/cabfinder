/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../Context/ThemeContext";

const EditProfileForm = ({ owner, onSubmit }) => {
    const { theme } = useTheme();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            location: ""
        }
    });

    useEffect(() => {
        if (owner) {
            reset({
                name: owner.name || "",
                email: owner.email || "",
                phone: owner.phone || "",
                location: owner.location || ""
            });
        }
    }, [owner, reset]);

    return (
        <form id="editProfileForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Name
                </label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Email
                </label>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                    })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Phone
                </label>
                <input
                    {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" }
                    })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>

            <div>
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Location
                </label>
                <input
                    {...register("location", { required: "Location is required" })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
            </div>
        </form>
    );
};

export default EditProfileForm;
