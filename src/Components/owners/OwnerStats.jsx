/* eslint-disable react/prop-types */
import { useTheme } from "../../Context/ThemeContext";

const OwnerStats = ({ cabs }) => {
    const { theme } = useTheme(); // Get theme from context

    const totalCabs = cabs.length;
    const occupiedCabs = cabs.filter(cab => !cab.available).length;
    const availableCabs = totalCabs - occupiedCabs;
    const averageRating = (cabs.reduce((sum, cab) => sum + cab.rating, 0) / totalCabs).toFixed(1);

    return (
        <section
            className={`p-6 rounded-xl shadow-md border transition-all
            ${theme === "dark"
                    ? "bg-[var(--dark-bg)] text-[var(--dark-text)] border-[var(--dark-border)]"
                    : "bg-[var(--light-bg)] text-[var(--light-text)] border-[var(--light-border)]"}`}
        >
            <h2 className="text-xl font-bold mb-5 text-center">📊 Owner Statistics</h2>

            <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-4 rounded-lg bg-[var(--primary)] text-white shadow-md">
                    <h3 className="text-lg font-semibold">Average Rating</h3>
                    <p className="text-2xl font-bold">{averageRating} ⭐</p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--secondary)] text-white shadow-md">
                    <h3 className="text-lg font-semibold">Total Cabs</h3>
                    <p className="text-2xl font-bold">{totalCabs}</p>
                </div>

                <div className="p-4 rounded-lg bg-green-500 text-white shadow-md">
                    <h3 className="text-lg font-semibold">Available Cabs</h3>
                    <p className="text-2xl font-bold">{availableCabs}</p>
                </div>

                <div className="p-4 rounded-lg bg-red-500 text-white shadow-md">
                    <h3 className="text-lg font-semibold">Occupied Cabs</h3>
                    <p className="text-2xl font-bold">{occupiedCabs}</p>
                </div>
            </div>
        </section>
    );
};

export default OwnerStats;
