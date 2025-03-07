import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router";

const INDIAN_CITIES = [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore", "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad"
];

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Minivan", "Luxury"];
const SEATER_OPTIONS = ["4-Seater", "6-Seater", "8-Seater"];

const CabFinderForm = () => {
    const { theme } = useTheme();
    const { handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    const [sourceQuery, setSourceQuery] = useState("");
    const [destQuery, setDestQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredDestCities, setFilteredDestCities] = useState([]);
    const [tripType, setTripType] = useState("one-way");
    const [travelDate, setTravelDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [carType, setCarType] = useState(CAR_TYPES[0]);
    const [seater, setSeater] = useState(SEATER_OPTIONS[0]);


    const sourceRef = useRef(null);
    const destRef = useRef(null);

    useEffect(() => {
        setFilteredCities(sourceQuery ? INDIAN_CITIES.filter(city => city.toLowerCase().includes(sourceQuery.toLowerCase())) : []);
    }, [sourceQuery]);

    useEffect(() => {
        setFilteredDestCities(destQuery ? INDIAN_CITIES.filter(city => city.toLowerCase().includes(destQuery.toLowerCase())) : []);
    }, [destQuery]);

    const handleCitySelect = (city, type) => {
        if (type === "source") {
            setSourceQuery(city);
            setFilteredCities([]);
            setValue("source", city);
        } else {
            setDestQuery(city);
            setFilteredDestCities([]);
            setValue("destination", city);
        }
    };

    const handleClickOutside = (event) => {
        if (sourceRef.current && !sourceRef.current.contains(event.target)) {
            setFilteredCities([]);
        }
        if (destRef.current && !destRef.current.contains(event.target)) {
            setFilteredDestCities([]);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // const onSubmit = (data) => {
    //     const { source, destination, carType, seater } = data;

    //     if (!source || !destination) {
    //         alert("Please enter both source and destination.");
    //         return;
    //     }

    //     const searchParams = encodeURIComponent(JSON.stringify({ source, destination, carType, seater, travelDate, returnDate }));
    //     navigate(`/cab-list/${searchParams}`);
    // };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("source", data.source);
        formData.append("destination", data.destination);
        formData.append("carType", carType);
        formData.append("seater", seater);
        formData.append("travelDate", travelDate || "N/A");
        formData.append("returnDate", returnDate || "N/A");

        try {
            const response = await fetch("http://localhost:8000/submit.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Server Response:", result);

            const { source, destination, carType, seater } = data;

            if (!source || !destination) {
                alert("Please enter both source and destination.");
                return;
            }

            const searchParams = encodeURIComponent(JSON.stringify({ source, destination, carType, seater, travelDate, returnDate }));
            navigate(`/cab-list/${searchParams}`);
        } catch (error) {
            console.error("Error submitting form:", error);

        };
    };



    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-all
            ${theme === "dark" ? "bg-[var(--dark-bg)] text-[var(--dark-text)]" : "bg-[var(--light-bg)] text-[var(--light-text)]"}`}>
            <div className={`w-full max-w-md shadow-lg rounded-2xl p-6 ${theme === "dark" ? "bg-[#1B1A55] text-white" : "bg-white text-gray-900"}`}>
                <h2 className="text-3xl font-bold text-center">Find Your Cab</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Source City */}
                    <div className="relative" ref={sourceRef}>
                        <label className="block font-medium mb-1">Source</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                            placeholder="Enter source city..."
                            value={sourceQuery}
                            onChange={(e) => setSourceQuery(e.target.value)}
                        />
                        {/* Suggestions */}
                        {filteredCities.length > 0 && (
                            <ul className={`absolute left-0 w-full mt-1 max-h-40 overflow-auto rounded-lg border shadow-lg z-10
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}>
                                {filteredCities.map(city => (
                                    <li key={city} className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                                        onClick={() => handleCitySelect(city, "source")}>
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Destination City */}
                    <div className="relative" ref={destRef}>
                        <label className="block font-medium mb-1">Destination</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                            placeholder="Enter destination city..."
                            value={destQuery}
                            onChange={(e) => setDestQuery(e.target.value)}
                        />
                        {/* Suggestions */}
                        {filteredDestCities.length > 0 && (
                            <ul className={`absolute left-0 w-full mt-1 max-h-40 overflow-auto rounded-lg border shadow-lg z-10
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}>
                                {filteredDestCities.map(city => (
                                    <li key={city} className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                                        onClick={() => handleCitySelect(city, "destination")}>
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Trip Type */}
                    <select className={`w-full px-4 py-2 border rounded-lg
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        value={tripType} onChange={(e) => setTripType(e.target.value)}>
                        <option value="one-way">One-Way</option>
                        <option value="round-trip">Round Trip</option>
                    </select>

                    {/* Travel Date */}
                    <label className="block font-medium mb-1">{tripType === "round-trip" ? "From" : "Date"}</label>
                    <input type="date" className={`w-full px-4 py-2 border rounded-lg
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />

                    {/* Return Date - Show only when Round Trip is selected */}
                    {tripType === "round-trip" && (
                        <>
                            <label className="block font-medium mb-1">To</label>
                            <input type="date" className={`w-full px-4 py-2 border rounded-lg
                                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                                value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                        </>
                    )}

                    {/* Car Type & Seater */}
                    {/* Car Type */}
                    <select
                        className={`w-full px-4 py-2 border rounded-lg
                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                    >
                        {CAR_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>

                    {/* Seater */}
                    <select
                        className={`w-full px-4 py-2 border rounded-lg
                ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        value={seater}
                        onChange={(e) => setSeater(e.target.value)}
                    >
                        {SEATER_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>


                    <button type="submit" className="w-full bg-[#3674B5] text-white py-2 rounded-lg">Search</button>
                </form>
            </div>
        </div>
    );
};

export default CabFinderForm;
