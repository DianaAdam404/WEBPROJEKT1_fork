import api from '../api/axiosInstance';
import { useEffect, useState } from 'react';

export default function TestForm() {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users/test');
                setMessage(response.data);
                console.log('Test endpoint response:', response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
                setMessage('Hiba történt a tesztadatok lekérése során');
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>TestForm</h1>
            <p>{JSON.stringify(message)}</p>
        </>
    );
}