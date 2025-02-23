import { useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext"; // Import ThemeContext
import cabOwners from "../UTILS/data";
import CabListPageCard from "../Components/CabListPage/CabListPageCard";

const CabListPage = () => {
    const { theme } = useTheme(); // Get theme from context
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const params = searchParams.get("filters");

    let filteredCabs = [];

    if (params && params !== "all") {
        try {
            const decodedParams = JSON.parse(decodeURIComponent(params));
            const { source, destination, carType, seater } = decodedParams;

            filteredCabs = cabOwners.flatMap(owner =>
                owner.cabs
                    .filter(cab =>
                        (!source || cab.source === source) &&
                        (!destination || cab.destination === destination) &&
                        (!carType || cab.type === carType) &&
                        (!seater || cab.seater === seater) &&
                        cab.available
                    )
                    .map(cab => ({ ...cab, ownerName: owner.name }))
            );
        } catch (error) {
            console.error("Error parsing cab search parameters:", error);
        }
    } else {
        filteredCabs = cabOwners.flatMap(owner =>
            owner.cabs
                .filter(cab => cab.available)
                .map(cab => ({ ...cab, ownerName: owner.name }))
        );
    }

    return (
        <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-[#070F2B] text-white" : "bg-gray-100 text-gray-900"}`}>
            <h2 className="text-3xl font-bold text-center mb-6">Available Cabs</h2>

            {filteredCabs.length === 0 ? (
                <p className="text-center text-lg">No cabs available.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCabs.map((cab) => (
                        <CabListPageCard key={cab.id} cab={cab} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CabListPage;
