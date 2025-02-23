/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useTheme } from "../Context/ThemeContext";

const Modal = ({ btnName, title, content, btnText, onSubmit, btnClass }) => {
    const modalRef = useRef(null);
    const { theme } = useTheme();

    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        closeModal();
    };

    return (
        <>
            {/* Trigger Button */}
            <button className={btnClass} onClick={openModal}>
                {btnName}
            </button>

            {/* Modal Dialog with Blurred Background */}
            <dialog
                ref={modalRef}
                className="modal fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
            >
                {/* Solid Modal Box */}
                <div
                    className={`modal-box p-6 rounded-lg shadow-xl transition-all max-w-md w-full border 
                    ${theme === "dark"
                            ? "bg-[#070F2B] text-[var(--dark-text)] border-[var(--dark-border)] shadow-lg"
                            : "bg-white text-[var(--light-text)] border-[var(--light-border)] shadow-lg"}`}
                >
                    <h3 className="font-bold text-xl">{title}</h3>

                    <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
                        <div>{content}</div>
                        <div className="modal-action flex justify-end gap-4">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium rounded-lg transition-all 
                                bg-gray-500 hover:bg-gray-600 text-white"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={btnClass}
                            >
                                {btnText}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
