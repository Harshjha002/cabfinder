// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useTheme } from "../Context/ThemeContext";
// import cabOwners from "../UTILS/data";
// import CabList from "../Components/owners/CabList";
// import OwnerInfoCard from "../Components/owners/OwnerInfoCard";
// // import OwnerStats from "../Components/owners/OwnerStats";
// import EditProfileForm from "../Components/owners/EditProfileForm";

// const OwnerDashboardPage = () => {
//     const { id } = useParams();
//     const { theme } = useTheme();
//     const [ownerData, setOwnerData] = useState(null);

//     useEffect(() => {
//         const owner = id ? cabOwners.find(owner => owner.id === parseInt(id)) : cabOwners[0];
//         setOwnerData(owner);
//     }, [id]);

//     if (!ownerData) {
//         return (
//             <div className={`flex items-center justify-center min-h-screen transition-all
//                 ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}
//             >
//                 <p className="text-lg text-gray-500 dark:text-gray-400">Owner not found!</p>
//             </div>
//         );
//     }

//     const isProfileComplete = ownerData.name && ownerData.email && ownerData.phone && ownerData.location;

//     return (
//         <section className={`p-6 max-w-5xl mx-auto space-y-6 transition-all
//             ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}
//         >
//             {isProfileComplete ? (
//                 <>
//                     <div className="grid gap-6">
//                         <OwnerInfoCard owner={ownerData} />
//                     </div>

//                     {/* Cab List */}
//                     <CabList cabs={ownerData.cabs} />
//                 </>
//             ) : (
//                 <div className="bg-white dark:bg-[#1B1A55] p-6 rounded-lg shadow-lg">
//                     <p className="text-lg font-semibold text-red-500 mb-4">Please complete your account details</p>
//                     <EditProfileForm
//                         owner={ownerData}
//                         onSubmit={(updatedData) => console.log("Updated Owner Data:", updatedData)}
//                     />
//                     <button
//                         form="editProfileForm"
//                         type="submit"
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//                     >
//                         Save Profile
//                     </button>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default OwnerDashboardPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../Context/ThemeContext";
import OwnerInfoCard from "../Components/owners/OwnerInfoCard";
import CabList from "../Components/owners/CabList";

const OwnerDashboardPage = () => {

    const cab = [{
        id: "cab1",
        model: "Toyota Innova",
        type: "SUV",
        seater: "6-Seater",
        farePerKm: 15,
        dailyFee: 1500,
        rating: 4.8,
        available: true,
        image: "https://c4.wallpaperflare.com/wallpaper/628/480/45/bugatti-bugatti-divo-car-red-car-wallpaper-preview.jpg",
    },
    {
        id: "cab2",
        model: "Maruti Swift",
        type: "Hatchback",
        seater: "4-Seater",
        farePerKm: 10,
        dailyFee: 1000,
        rating: 4.5,
        available: true,
        image: "https://c4.wallpaperflare.com/wallpaper/628/480/45/bugatti-bugatti-divo-car-red-car-wallpaper-preview.jpg",
    },
    {
        id: "cab11",
        model: "Hyundai Verna",
        type: "Sedan",
        seater: "4-Seater",
        farePerKm: 12,
        dailyFee: 1200,
        rating: 4.6,
        available: false,
        image: "https://c4.wallpaperflare.com/wallpaper/628/480/45/bugatti-bugatti-divo-car-red-car-wallpaper-preview.jpg",
    }]

    const { id } = useParams(); // Get user ID from URL params
    const { theme } = useTheme();
    const [ownerData, setOwnerData] = useState({
        id: null,
        name: "",
        email: "",
        owner: false,
        contactNo: "",
        imageURl: "",

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${id}`);
                setOwnerData(response.data);
                console.log("ownerdetaile", response.data)
            } catch (err) {
                console.error("Error fetching owner data:", err);
                setError("Failed to load owner data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOwnerData();
    }, [id]);

    console.log(ownerData)

    return (
        <div className={`p-6 max-w-5xl mx-auto space-y-6 transition-all 
            ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}
        >
            {loading ? (
                <p>Loading owner data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : ownerData && ownerData.id ? (
                <>
                    <OwnerInfoCard owner={ownerData} />

                </>
            ) : (
                <p>No owner data available.</p>
            )}

            <CabList cabs={cab} /> n

        </div>
    );
}

export default OwnerDashboardPage

