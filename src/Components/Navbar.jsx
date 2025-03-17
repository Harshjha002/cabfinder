import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import ThemeController from "../ui/ThemeController";
import logo from "../assets/logo.png";
import { useTheme } from "../Context/ThemeContext";
import { useUser } from "../Context/UserContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { logout, user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = theme === "dark";
    const baseClasses = "text-base font-medium transition duration-200";
    const primaryButton = "px-4 py-2 bg-[var(--primary)] hover:bg-opacity-90 text-white rounded-lg shadow-md";
    const containerClasses = `py-4 px-6 flex justify-between items-center shadow-md transition-all border-b ${isDark ? "bg-[#070F2B] text-white border-[#1B1A55]" : "bg-white text-black border-gray-200"
        }`;
    const mobileMenuClasses = `fixed top-4 right-4 w-56 p-4 rounded-lg shadow-lg z-50 transition-transform transform ${isDark ? "bg-[#1B1A55] text-white" : "bg-white text-black"
        } ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`;

    return (
        <nav className={containerClasses}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <img src={logo} alt="Cab Finder Logo" className="w-10 h-10 rounded-full border border-[var(--primary)] shadow-md" />
            </div>

            <div className="hidden md:flex items-center gap-6">
                {user ? (
                    <div className="flex gap-6 items-center">
                        <p className="text-[var(--primary)] font-semibold">{user.name}</p>
                        <button onClick={() => (logout(), navigate("/sign-in"))} className={`${baseClasses} text-gray-700 hover:text-[var(--primary)]`}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-6">
                        <Link to="/sign-in" className={`${baseClasses} text-gray-700 hover:text-[var(--primary)]`}>
                            Log In
                        </Link>
                        <Link to="/sign-up" className={primaryButton}>
                            Sign Up
                        </Link>
                    </div>
                )}
                <ThemeController />
            </div>

            <div className="md:hidden">
                <button className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" onClick={() => setMenuOpen(true)}>
                    <Menu size={28} />
                </button>
            </div>

            {menuOpen && (
                <>
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-40" onClick={() => setMenuOpen(false)}></div>
                    <div className={mobileMenuClasses}>
                        <button className="absolute top-2 right-2 p-1" onClick={() => setMenuOpen(false)}>
                            <X size={24} />
                        </button>
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <p className="text-center text-[var(--primary)] font-semibold">{user.name}</p>
                                <button onClick={() => (logout(), navigate("/sign-in"))} className={`${baseClasses} text-gray-700 hover:text-[var(--primary)]`}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/sign-in" className={`${baseClasses} text-gray-700 hover:text-[var(--primary)]`}>
                                    Log In
                                </Link>
                                <Link to="/sign-up" className={primaryButton}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                        <div className="mt-3 flex justify-center">
                            <ThemeController />
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
