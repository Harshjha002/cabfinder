/* eslint-disable react/prop-types */
import Modal from "../Model";
import AddCabForm from "./AddCabForm";
import CabListCard from "./CabListCard";
import { useTheme } from "../../Context/ThemeContext";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const CabList = ({ cabs }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme();
    const { user } = useUser()

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
                <button onClick={() => setIsOpen(true)}>+ Add Cab</button>
                {isOpen &&
                    <Modal
                        ModalHeading="Add new Cab"
                        onClose={() => setIsOpen(false)}
                        onConfirm={(data) => {
                            axios.post(`http://localhost:8080/api/cabs/${user.id}`, data)
                                .then(() => setIsOpen(false))
                                .catch(err => console.error("Failed to add cab:", err));
                        }}
                        confirmText="Add"
                        isOpen={isOpen}
                    >
                        <AddCabForm />
                    </Modal>
                }
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
