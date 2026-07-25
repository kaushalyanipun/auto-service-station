export const mockWorkOrders = [
  {
    id: 1,
    vehicle: { id: 101, plate_number: 'CAB-1234', owner_name: 'Kamal Perera' },
    status: 'in_progress',
    started_at: '10:30 AM',
    items: [
      { id: 1, product_name: 'Engine Oil 4L', quantity: 1, unit_price: 12000, remark: 'Synthetic' }
    ],
    running_total: 12000
  },
  {
    id: 2,
    vehicle: { id: 102, plate_number: 'WP-3456', owner_name: 'Nimal Silva' },
    status: 'awaiting_parts',
    started_at: '11:15 AM',
    items: [],
    running_total: 0
  }
];