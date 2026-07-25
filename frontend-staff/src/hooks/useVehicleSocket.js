import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useVehicleSocket = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Backend WebSocket connection එක Setup කිරීම
    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

    socket.on('vehicle_update', (data) => {
      setVehicles(data);
    });

    return () => socket.disconnect();
  }, []);

  return { vehicles };
};