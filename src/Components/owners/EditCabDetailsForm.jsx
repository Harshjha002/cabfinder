/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useTheme } from "../../Context/ThemeContext";

const EditCabDetailsForm = ({ cab, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            cabName: cab?.cabName || "",
            model: cab?.model || "",
            registrationNumber: cab?.registrationNumber || "",
            seatingCapacity: cab?.seatingCapacity || "",
            farePerKm: cab?.farePerKm || ""
        }
    });

    const { theme } = useTheme();

    return (
        <form id="editCabForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </form>
    );
};

export default EditCabDetailsForm;
