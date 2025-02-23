import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const HomePage = () => {
    const { theme } = useTheme();

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 transition-all
            ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}
        >
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
                    Find Your Perfect Ride
                </h1>
                <p className="text-lg font-medium text-[var(--light-text)] dark:text-[var(--dark-text)] mb-8">
                    Book a cab effortlessly, or list your own and earn money.
                    <br className="hidden sm:block" />
                    Experience the smoothest cab booking service today!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/cab-finder"
                        className="px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all 
                        bg-[var(--primary)] text-white hover:bg-opacity-90 transform hover:scale-105"
                    >
                        Find a Cab 🚖
                    </Link>

                    <Link
                        to="/owner-dashboard"
                        className="px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all 
                        bg-[var(--secondary)] text-white hover:bg-opacity-90 transform hover:scale-105"
                    >
                        Become an Owner 🚗
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
