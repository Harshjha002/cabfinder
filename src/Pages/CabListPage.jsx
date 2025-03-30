import { useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import cabOwners from "../UTILS/data";
import CabListPageCard from "../Components/CabListPage/CabListPageCard";
import { useMemo } from "react";

const CabListPage = () => {
    const { theme } = useTheme();
    const location = useLocation();

    const getFilteredCabs = (params) => {
        if (!params || params === "all") {
            return cabOwners.flatMap(owner =>
                owner.cabs.filter(cab => cab.available).map(cab => ({ ...cab, ownerName: owner.name }))
            );
        }

        try {
            const decodedParams = JSON.parse(decodeURIComponent(params));
            const { source, destination, carType, seater } = decodedParams;

            return cabOwners.flatMap(owner =>
                owner.cabs
                    .filter(cab =>
                        (!source || cab.source.toLowerCase() === source.toLowerCase()) &&
                        (!destination || cab.destination.toLowerCase() === destination.toLowerCase()) &&
                        (!carType || cab.type.toLowerCase() === carType.toLowerCase()) &&
                        (!seater || cab.seater === seater) &&
                        cab.available
                    )
                    .map(cab => ({ ...cab, ownerName: owner.name }))
            );
        } catch (error) {
            console.error("Error parsing cab search parameters:", error);
            return [];
        }
    };

    // Memoized filtered cabs to prevent unnecessary re-renders
    const searchParams = new URLSearchParams(location.search);
    const params = searchParams.get("filters");
    const filteredCabs = useMemo(() => getFilteredCabs(params), [params]);

    return (
        <div className={`min-h-screen p-6 transition-all ${theme === "dark" ? "bg-[#070F2B] text-white" : "bg-gray-100 text-gray-900"}`}>
            <h2 className="text-3xl font-bold text-center mb-6">Available Cabs</h2>

            {filteredCabs.length === 0 ? (
                <p className="text-center text-lg">No cabs available.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCabs.map(cab => (
                        <CabListPageCard key={cab.id} cab={cab} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CabListPage;
