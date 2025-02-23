import Modal from "../Model";
import EditCabDetailsForm from "./EditCabDetailsForm";
import { useTheme } from "../../Context/ThemeContext";

/* eslint-disable react/prop-types */
const CabListCard = ({ cab }) => {
    const { theme } = useTheme();

    return (
        <div
            className={`p-4 rounded-lg shadow-md border transition-all
            ${theme === "dark"
                    ? "bg-[var(--dark-bg)] text-[var(--dark-text)] border-[var(--dark-border)]"
                    : "bg-[var(--light-bg)] text-[var(--light-text)] border-[var(--light-border)]"}`}
        >
            {/* Cab Image */}
            <div className="relative w-full h-40 rounded-md overflow-hidden">
                <img
                    src={cab.image}
                    alt={cab.model}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Cab Details */}
            <div className="mt-4 space-y-1">
                <h3 className="text-lg font-semibold">{cab.model}</h3>
                <p className="text-sm">🚗 Type: {cab.type}</p>
                <p className="text-sm">🛋️ Seats: {cab.seater}</p>
                <p className="text-sm">💰 Fare: ₹{cab.farePerKm} / km</p>
                <p className="text-sm">📆 Daily Fee: ₹{cab.dailyFee}</p>
                <p className="text-sm">⭐ Rating: {cab.rating}</p>
                <p className={`text-sm font-medium ${cab.available ? "text-green-500" : "text-red-500"}`}>
                    {cab.available ? "🟢 Available" : "🔴 Occupied"}
                </p>
            </div>

            {/* Edit Cab Button */}
            <div className="mt-4">
                <Modal
                    btnName="✏️ Edit Cab"
                    title="Edit Cab Details"
                    content={<EditCabDetailsForm />}
                    onSubmit={() => console.log("Cab Edited")}
                    btnText="Save Changes"
                    btnClass="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-[var(--secondary)] text-white hover:bg-opacity-90 transition-all"
                />
            </div>
        </div>
    );
};

export default CabListCard;
