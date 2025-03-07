import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../Context/ThemeContext";

// eslint-disable-next-line react/prop-types
const AddCabForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            cabName: "",
            model: "",
            registrationNumber: "",
            seatingCapacity: "",
            farePerKm: "",
            cabImage: null
        }
    });

    const { theme } = useTheme();
    const [preview, setPreview] = useState(null);
    const [imageName, setImageName] = useState("");

    const cabImage = watch("cabImage");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                return;
            }
            setPreview(URL.createObjectURL(file));
            setImageName(file.name);
            setValue("cabImage", file);
        }
    };

    return (
        <form id="addCabForm" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cab Name */}
            <div>
                <label className="block text-sm font-medium">Cab Name</label>
                <input
                    {...register("cabName", { required: "Cab name is required" })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.cabName && <p className="text-red-500 text-xs">{errors.cabName.message}</p>}
            </div>

            {/* Model */}
            <div>
                <label className="block text-sm font-medium">Model</label>
                <input
                    {...register("model", { required: "Model is required" })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.model && <p className="text-red-500 text-xs">{errors.model.message}</p>}
            </div>

            {/* Registration Number */}
            <div>
                <label className="block text-sm font-medium">Registration Number</label>
                <input
                    {...register("registrationNumber", {
                        required: "Registration number is required",
                        pattern: { value: /^[A-Z0-9-]+$/, message: "Invalid format" }
                    })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.registrationNumber && (
                    <p className="text-red-500 text-xs">{errors.registrationNumber.message}</p>
                )}
            </div>

            {/* Seating Capacity */}
            <div>
                <label className="block text-sm font-medium">Seating Capacity</label>
                <input
                    type="number"
                    {...register("seatingCapacity", {
                        required: "Seating capacity is required",
                        min: { value: 1, message: "At least 1 seat required" }
                    })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.seatingCapacity && (
                    <p className="text-red-500 text-xs">{errors.seatingCapacity.message}</p>
                )}
            </div>

            {/* Fare Per Km */}
            <div>
                <label className="block text-sm font-medium">Fare Per Km</label>
                <input
                    type="number"
                    step="0.01"
                    {...register("farePerKm", { required: "Fare is required" })}
                    className={`w-full p-3 border rounded-lg outline-none transition-all 
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 text-black focus:border-blue-500"}`}
                />
                {errors.farePerKm && (
                    <p className="text-red-500 text-xs">{errors.farePerKm.message}</p>
                )}
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium">Upload Cab Image</label>
                <div className="relative w-full">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        onChange={handleImageChange}
                    />
                    <div className={`w-full p-3 text-center rounded-lg transition-all cursor-pointer
                        ${theme === "dark"
                            ? "bg-[#1B1A55] border-gray-600 text-white hover:bg-[#23235a]"
                            : "bg-white border-gray-300 text-black hover:bg-gray-100"}`}>
                        Choose Image
                    </div>
                </div>
                {imageName && <p className="text-sm mt-2 text-gray-500">{imageName}</p>}
            </div>

            {/* Image Preview */}
            {preview && (
                <div className="mt-4 flex justify-center">
                    <img src={preview} alt="Cab Preview"
                        className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-300"
                    />
                </div>
            )}
        </form>
    );
};

export default AddCabForm;
