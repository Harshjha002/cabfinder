import { useParams } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import cabOwners from "../UTILS/data";
import { useState } from "react";

const ContactOwnerFormPage = () => {
    const { id } = useParams();
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);

    const owner = cabOwners.find(owner =>
        owner.cabs.some(cab => cab.id === id)
    );

    if (!owner) {
        return (
            <div className={`text-center text-xl mt-10 
                ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>
                No owner found for this cab!
            </div>
        );
    }

    const cab = owner.cabs.find(cab => cab.id === id);

    // Function to copy phone number to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(owner.phone);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className={`min-h-screen flex items-center justify-center transition-all
            ${theme === "dark" ? "bg-[#070F2B] text-[#E0E0E0]" : "bg-gray-100 text-gray-900"}`}>

            <div className={`p-6 rounded-lg shadow-md max-w-md w-full border 
                ${theme === "dark" ? "bg-[#1B1A55] text-[#E0E0E0] border-[#535C91]" : "bg-white text-gray-900 border-gray-300"}`}>

                {/* Owner Details */}
                <h2 className="text-2xl font-bold mb-4 text-center">Owner Contact Details</h2>
                <img src={owner.image} alt={owner.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300" />

                <div className="space-y-2 text-center">
                    <p><span className="font-semibold">Name:</span> {owner.name}</p>
                    <p><span className="font-semibold">Phone:</span> {owner.phone}</p>
                    <p><span className="font-semibold">Email:</span> {owner.email}</p>
                </div>

                <hr className={`my-4 ${theme === "dark" ? "border-[#535C91]" : "border-gray-300"}`} />

                {/* Cab Details */}
                <h2 className="text-xl font-bold text-center">Cab Details</h2>
                <img src={cab.image} alt={cab.model} className="w-full h-40 rounded-lg mb-4 object-cover border border-gray-300" />

                <div className="space-y-2">
                    <p><span className="font-semibold">Model:</span> {cab.model}</p>
                    <p><span className="font-semibold">Type:</span> {cab.type}</p>
                    <p><span className="font-semibold">Seats:</span> {cab.seater}</p>
                    <p><span className="font-semibold">Fare Per Km:</span> ₹{cab.farePerKm}</p>
                    <p><span className="font-semibold">Daily Fee:</span> ₹{cab.dailyFee}</p>
                    <p className={`font-semibold ${cab.available ? "text-green-400" : "text-red-400"}`}>
                        {cab.available ? "Available" : "Not Available"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                    <a
                        href={`tel:${owner.phone}`}
                        className="w-1/2 py-2 rounded-lg text-center transition-all duration-200 bg-green-600 hover:bg-green-700 text-white"
                        aria-label="Call Owner"
                    >
                        📞 Call
                    </a>
                    <button
                        onClick={handleCopy}
                        className="w-1/2 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 
                            bg-blue-600 hover:bg-blue-700 text-white"
                        aria-label="Copy Phone Number"
                    >
                        📋 {copied ? "Copied!" : `Copy ${owner.phone}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactOwnerFormPage;
