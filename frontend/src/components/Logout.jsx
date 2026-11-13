import api from '../api/axiosInstance';
import { useEffect, useState } from 'react';

export default function Logout() {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users/logout');
                setMessage(response.data);
                console.log('Logout endpoint response:', response.data);
            } catch (error) {
                console.error('Error fetching logout data:', error);
                setMessage('Hiba történt a kijelentkezés során');
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Logout</h1>
            <p>{JSON.stringify(message)}</p>
        </>
    );
}