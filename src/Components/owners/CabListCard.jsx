/* eslint-disable react/prop-types */
import Modal from "../Model";
import AddCabForm from "./AddCabForm";
import CabListCard from "./CabListCard";
import { useTheme } from "../../Context/ThemeContext";

const CabList = ({ cabs }) => {
    const { theme } = useTheme();

    return (
        <section
            className={`p-6 rounded-xl shadow-md border transition-all mt-6 
                ${theme === "dark"
                    ? "bg-[#070F2B] text-[#E0E0E0] border-[#535C91]"
                    : "bg-white text-gray-900 border-gray-300"}`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">🚖 Your Cabs</h2>

                <Modal
                    btnName="+ Add Cab"
                    title="Add New Cab"
                    content={<AddCabForm />}
                    onSubmit={() => console.log("Cab Added!")}
                    btnText="Add"
                    btnClass="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all"
                />
            </div>

            {cabs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cabs.map((cab) => (
                        <CabListCard key={cab.id} cab={cab} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 dark:text-gray-400">No cabs available. Add a new cab to get started!</p>
            )}
        </section>
    );
};

export default CabList;
