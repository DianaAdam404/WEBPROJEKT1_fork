import api from "../api/axiosInstance";
import { useEffect, useState } from "react";

export default function TestForm() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/api/test");
                setMessage(response.data);
                console.log("Test data fetched:", response.data);
            } catch (error) {
                console.error("Error fetching test data:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <div>
            <h1>Test Form</h1>
            <p>{message}</p>
        </div>
    );
}
