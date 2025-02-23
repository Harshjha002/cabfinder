/* eslint-disable react/prop-types */
import Modal from "../Model";
import AddCabForm from "./AddCabForm";
import CabListCard from "./CabListCard";
import { useTheme } from "../../Context/ThemeContext";

const CabList = ({ cabs }) => {
    const { theme } = useTheme(); // Get theme from context

    return (
        <section
            className={`p-6 rounded-xl shadow-md border transition-all mt-6
            ${theme === "dark"
                    ? "bg-[var(--dark-bg)] text-[var(--dark-text)] border-[var(--dark-border)]"
                    : "bg-[var(--light-bg)] text-[var(--light-text)] border-[var(--light-border)]"}`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">🚖 Your Cabs</h2>

                {/* Add Cab Button */}
                <Modal
                    btnName="+ Add Cab"
                    title="Add New Cab"
                    content={<AddCabForm />}
                    onSubmit={() => console.log("Cab Added!")}
                    btnText="Add"
                    btnClass="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-[var(--primary)] text-white hover:bg-opacity-90 transition-all"
                />
            </div>

            {/* Grid Layout for Cab Cards */}
            {cabs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cabs.map(cab => <CabListCard key={cab.id} cab={cab} />)}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No cabs available.</p>
            )}
        </section>
    );
};

export default CabList;
