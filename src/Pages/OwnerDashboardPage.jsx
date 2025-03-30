import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../Context/ThemeContext";
import OwnerInfoCard from "../Components/owners/OwnerInfoCard";
import CabList from "../Components/owners/CabList";

const OwnerDashboardPage = () => {
    const { id } = useParams(); // Get user ID from URL params
    const { theme } = useTheme();

    const [ownerData, setOwnerData] = useState(null);
    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${id}`);
                setOwnerData(response.data);

                // Fetch cabs associated with the owner (assuming an API endpoint)
                // const cabResponse = await axios.get(`http://localhost:8080/api/cabs?ownerId=${id}`);
                // setCabs(cabResponse.data);
            } catch (err) {
                console.error("Error fetching owner data:", err);
                setError("Failed to load owner data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOwnerData();
    }, [id]);

    return (
        <div className={`p-6 max-w-5xl mx-auto space-y-6 transition-all 
            ${theme === "dark" ? "bg-[#070F2B] text-[#E0E0E0]" : "bg-gray-100 text-gray-900"}`}
        >
            {loading ? (
                <p className="text-center text-lg">Loading owner data...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : ownerData ? (
                <>
                    <OwnerInfoCard owner={ownerData} />
                    <CabList cabs={cabs} />
                </>
            ) : (
                <p className="text-center text-lg text-gray-500">No owner data available.</p>
            )}
        </div>
    );
};

export default OwnerDashboardPage;
