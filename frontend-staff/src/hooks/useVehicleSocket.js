import { useState, useCallback } from 'react';

const USE_MOCK = true; // flip to false once the backend socket/API is ready

const initialData = [
  {
    id: 1,
    vehicle: { plate_number: 'CMS-22424', owner_name: 'Akash Guptha' },
    status: 'in_progress',
    started_at: '05:24 PM',
    items: [],
  },
  {
    id: 2,
    vehicle: { plate_number: 'CAB-1234', owner_name: 'Kamal Perera' },
    status: 'in_progress',
    started_at: '10:30 AM',
    items: [{ id: 101, description: 'Engine oil 4L', quantity: 1, unit_price: 12000 }],
  },
  {
    id: 3,
    vehicle: { plate_number: 'WP-3456', owner_name: 'Nimal Silva' },
    status: 'awaiting_parts',
    started_at: '09:05 AM',
    items: [],
  },
];

// Swap this out for a real WebSocket / polling connection to your backend.
export const useVehicleSocket = () => {
  const [workOrders, setWorkOrders] = useState(initialData);
  const [isConnected] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = useCallback(async (orderId, item) => {
    setIsSubmitting(true);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        setWorkOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? { ...o, items: [...o.items, { id: Date.now(), ...item }] }
              : o
          )
        );
      } else {
        // const res = await fetch(`/api/work-orders/${orderId}/items`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(item),
        // });
        // const updated = await res.json();
        // setWorkOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { workOrders, isConnected, addItem, isSubmitting };
};
