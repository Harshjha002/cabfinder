/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

const CabListPageCard = ({ cab }) => {
    const { theme } = useTheme();

    return (
        <div className={`p-4 rounded-lg shadow-md flex flex-col ${theme === "dark" ? "bg-[#1B1A55] text-white" : "bg-white text-gray-900"}`}>
            <img
                src={cab.image}
                alt={cab.type}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-300"
            />
            <div className="flex-1">
                <h3 className="text-xl font-bold">{cab.type} - {cab.seater} Seater</h3>
                <p><span className="font-semibold">Owner:</span> {cab.ownerName}</p>
                <p><span className="font-semibold">Source:</span> {cab.source}</p>
                <p><span className="font-semibold">Destination:</span> {cab.destination}</p>
                <p><span className="font-semibold">Price:</span> ₹{cab.price}</p>
                <p className={`font-semibold ${cab.available ? "text-green-400" : "text-red-400"}`}>
                    {cab.available ? "Available" : "Not Available"}
                </p>

                <Link
                    to={`/contact-owner/${cab.id}`}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Contact Owner
                </Link>
            </div>
        </div>
    );
};

export default CabListPageCard;
