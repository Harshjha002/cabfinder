import { useTheme } from "../../Context/ThemeContext";
import Modal from "../Model";
import EditProfileForm from "./EditProfileForm";

/* eslint-disable react/prop-types */
const OwnerInfoCard = ({ owner }) => {
    const { theme } = useTheme(); // Get theme from context

    return (
        <section
            className={`p-6 rounded-xl shadow-md border transition-all flex flex-col gap-4 
            ${theme === "dark"
                    ? "bg-[var(--dark-bg)] text-[var(--dark-text)] border-[var(--dark-border)]"
                    : "bg-[var(--light-bg)] text-[var(--light-text)] border-[var(--light-border)]"}`}
        >
            {/* Owner Image & Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Profile Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[var(--primary)] shadow-md">
                    <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
                </div>

                {/* Owner Details */}
                <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-semibold flex items-center gap-1">
                        {owner.name} <span className="text-lg">✨</span>
                    </h3>
                    <p className="text-sm flex items-center gap-1">
                        📍 {owner.location}
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2">
                        📞 {owner.phone}
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2">
                        📧 {owner.email}
                    </p>
                </div>

                {/* Modal Button */}
                <div className="mt-3 sm:mt-0">
                    <Modal
                        btnName="Edit Profile"
                        title="Edit Profile"
                        content={<EditProfileForm />}
                        onSubmit={() => console.log("Updated")}
                        btnText="Add"
                        btnClass="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-[var(--primary)] text-white hover:bg-opacity-90 transition-all"
                    />
                </div>
            </div>
        </section>
    );
};

export default OwnerInfoCard;
