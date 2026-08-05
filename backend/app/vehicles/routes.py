from fastapi import APIRouter, HTTPException, status
from . import schemas, service

router = APIRouter(prefix="/vehicles", tags=["Vehicles & ANPR"])

# KAN-15: Setup ANPR Camera Integration / Webhook Receiver
@router.post("/anpr/detect")
def handle_anpr_detection(payload: schemas.ANPRDetectRequest):
    # db parameter එක නැතුව direct service call එකක් කිරීම (Testing වලට)
    vehicle = service.get_vehicle_by_plate(None, payload.plate_number)
    
    if vehicle:
        return {
            "registered": True,
            "message": "Vehicle found in database",
            "redirect_to": "/working-vehicle",
            "vehicle": vehicle
        }
    
    return {
        "registered": False,
        "message": "Vehicle not registered",
        "redirect_to": "/register-vehicle",
        "plate_number": payload.plate_number
    }

# KAN-17: Vehicle Lookup Logic
@router.get("/{plate_number}", response_model=schemas.VehicleResponse)
def get_vehicle_details(plate_number: str):
    vehicle = service.get_vehicle_by_plate(None, plate_number)
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Vehicle not found"
        )
    return vehicle