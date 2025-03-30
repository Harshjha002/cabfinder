/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ ModalHeading, onClose, children, onConfirm, confirmText, isOpen }) => {
    const formRef = useRef(null);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            onConfirm(data);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-lg font-semibold">{ModalHeading}</h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <form ref={formRef}>{children}</form>
                <div className="flex justify-end gap-4 mt-4">
                    <button className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" type="button" onClick={handleConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Modal;
