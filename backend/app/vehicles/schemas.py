from pydantic import BaseModel
from typing import Optional

# ANPR Camera එකෙන් එවන Data එක
class ANPRDetectRequest(BaseModel):
    plate_number: str

# Vehicle එකේ Details එලියට යවන Structure එක
class VehicleResponse(BaseModel):
    id: int
    plate_number: str
    owner_name: Optional[str] = None
    phone: Optional[str] = None
    model: Optional[str] = None

    class Config:
        from_attributes = True