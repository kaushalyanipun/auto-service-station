import Vehicle from '../models/Vehicle.js';

// 🚗 Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ created_at: -1 });
    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🚗 Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }
    res.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🚗 Create new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { plate_number, owner_name, vehicle_type, contact_number } = req.body;

    if (!plate_number || !owner_name) {
      return res.status(400).json({
        success: false,
        message: 'Plate number and owner name are required',
      });
    }

    // Check if vehicle already exists
    const existingVehicle = await Vehicle.findOne({ plate_number });
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle with this plate number already exists',
      });
    }

    const newVehicle = new Vehicle({
      plate_number,
      owner_name,
      vehicle_type,
      contact_number,
    });

    await newVehicle.save();

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: newVehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🚗 Update vehicle status
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, owner_name, contact_number } = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status, owner_name, contact_number },
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🚗 Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }

    res.json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
