import { Link, useNavigate } from "react-router-dom";
import ThemeController from "../ui/ThemeController";
import logo from "../assets/logo.png";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import { X, Menu } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`py-4 px-6 flex justify-between items-center shadow-md transition-all
            ${theme === "dark" ? "bg-[#070F2B] text-white border-b border-[#1B1A55]" : "bg-white text-black border-b border-gray-200"}`}>

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <img src={logo} alt="Cab Finder Logo" className="w-10 h-10 rounded-full border border-[var(--primary)] shadow-md" />
                <h3 className="text-lg font-bold tracking-wide">CAB FINDER</h3>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
                <ul className="flex gap-6 text-base font-medium">
                    <li>
                        <Link to="/sign-in" className="hover:text-[var(--primary)] transition">Log In</Link>
                    </li>
                    <li>
                        <Link to="/sign-up" className="px-4 py-2 bg-[var(--primary)] hover:bg-opacity-90 text-white rounded-lg shadow-md transition">
                            Sign Up
                        </Link>
                    </li>
                </ul>
                <ThemeController />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    className="p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Floating Menu */}
            {menuOpen && (
                <>
                    {/* Blurred Background */}
                    <div
                        className="fixed inset-0 bg-black/10 backdrop-blur-md z-40"
                        onClick={() => setMenuOpen(false)}
                    ></div>

                    {/* Menu Panel */}
                    <div className={`fixed top-4 right-4 w-56 p-4 rounded-lg shadow-lg z-50 transition-transform transform
                        ${theme === "dark" ? "bg-[#1B1A55] text-white" : "bg-white text-black"}
                        ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>

                        {/* Close Button */}
                        <button className="absolute top-2 right-2 p-1" onClick={() => setMenuOpen(false)}>
                            <X size={24} />
                        </button>

                        {/* Menu Items */}
                        <ul className="text-lg font-medium flex flex-col gap-3 mt-6">
                            <li>
                                <Link to="/sign-in" className="block hover:text-[var(--primary)] transition" onClick={() => setMenuOpen(false)}>
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link to="/sign-up" className="block hover:text-[var(--primary)] transition" onClick={() => setMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </li>
                            <li className="mt-3 flex justify-center">
                                <ThemeController />
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
