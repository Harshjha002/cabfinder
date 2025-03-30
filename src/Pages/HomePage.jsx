import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useUser } from "../Context/UserContext";

const HomePage = () => {
    const { theme } = useTheme();
    const { user } = useUser();
    const isDark = theme === "dark";

    console.log(user)

    // Styles
    const containerClasses = `
        min-h-screen flex items-center justify-center px-4 transition-all
        ${isDark ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}
    `;

    const baseButton = "px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all transform hover:scale-105";
    const primaryButton = `${baseButton} bg-[var(--primary)] text-white hover:bg-opacity-90`;
    const secondaryButton = `${baseButton} bg-[var(--secondary)] text-white hover:bg-opacity-90`;

    return (
        <div className={containerClasses}>
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
                    Find Your Perfect Ride
                </h1>
                <p className="text-lg font-medium mb-8">
                    Book a cab effortlessly, or list your own and earn money.
                    <br className="hidden sm:block" />
                    Experience the smoothest cab booking service today!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/cab-finder" className={primaryButton}>
                        Find a Cab 🚖
                    </Link>

                    {user && user?.isOwner ? <Link to={`/owner-dashboard/${user.id}`} className={primaryButton}>Become a Owner</Link> : <Link to={'/owner'} className={secondaryButton}>Become a Owner</Link>}




                </div>
            </div>
        </div>
    );
};

export default HomePage;
