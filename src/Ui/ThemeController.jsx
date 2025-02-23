import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeController = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all"
            aria-label="Toggle Theme"
        >
            {/* ☀️ Light Mode Icon */}
            <Sun
                size={20}
                className={`transition-all text-[var(--primary)] ${theme === "dark" ? "opacity-50 scale-90" : "opacity-100 scale-100"}`}
            />

            {/* Toggle Switch */}
            <div
                className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all"
                onClick={toggleTheme}
            >
                <div
                    className={`w-5 h-5 bg-white dark:bg-[var(--accent)] rounded-full shadow-md transition-all ${theme === "dark" ? "translate-x-6" : "translate-x-0"
                        }`}
                ></div>
            </div>

            {/* 🌙 Dark Mode Icon */}
            <Moon
                size={20}
                className={`transition-all text-[var(--secondary)] ${theme === "dark" ? "opacity-100 scale-100" : "opacity-50 scale-90"}`}
            />
        </label>
    );
};

export default ThemeController;
