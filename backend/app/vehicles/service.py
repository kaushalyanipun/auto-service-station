# app/vehicles/service.py

# Temporary mock database for testing
MOCK_VEHICLES = [
    {
        "id": 1,
        "plate_number": "CAB-1234",
        "owner_name": "Saman Perera",
        "phone": "0771234567",
        "model": "Toyota Corolla"
    },
    {
        "id": 2,
        "plate_number": "BAC-5588",
        "owner_name": "Kamal Silva",
        "phone": "0719876543",
        "model": "Nissan FB15"
    }
]

def get_vehicle_by_plate(db, plate_number: str):
    # Search inside mock data
    for vehicle in MOCK_VEHICLES:
        if vehicle["plate_number"].upper() == plate_number.upper():
            return vehicle
    return None