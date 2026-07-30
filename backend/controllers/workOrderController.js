import WorkOrder from '../models/WorkOrder.js';
import Vehicle from '../models/Vehicle.js';

// 📋 Get all work orders
export const getAllWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate('vehicle_id')
      .sort({ created_at: -1 });

    res.json({
      success: true,
      count: workOrders.length,
      data: workOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Get work order by ID
export const getWorkOrderById = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id).populate('vehicle_id');

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found',
      });
    }

    res.json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Create new work order
export const createWorkOrder = async (req, res) => {
  try {
    const { vehicle_id, status, technician, notes } = req.body;

    if (!vehicle_id) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle ID is required',
      });
    }

    // Verify vehicle exists
    const vehicle = await Vehicle.findById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }

    const newWorkOrder = new WorkOrder({
      vehicle_id,
      status,
      technician,
      notes,
    });

    await newWorkOrder.save();
    await newWorkOrder.populate('vehicle_id');

    res.status(201).json({
      success: true,
      message: 'Work order created successfully',
      data: newWorkOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Add item to work order
export const addItemToWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, quantity, unit_price } = req.body;

    if (!product_name || !quantity || !unit_price) {
      return res.status(400).json({
        success: false,
        message: 'Product name, quantity, and unit price are required',
      });
    }

    const workOrder = await WorkOrder.findById(id);
    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found',
      });
    }

    const newItem = {
      product_name,
      quantity: parseInt(quantity),
      unit_price: parseFloat(unit_price),
    };

    workOrder.items.push(newItem);
    await workOrder.save();
    await workOrder.populate('vehicle_id');

    res.status(201).json({
      success: true,
      message: 'Item added to work order',
      data: workOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Remove item from work order
export const removeItemFromWorkOrder = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const workOrder = await WorkOrder.findById(id);
    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found',
      });
    }

    workOrder.items = workOrder.items.filter((item) => item.id !== itemId);
    await workOrder.save();
    await workOrder.populate('vehicle_id');

    res.json({
      success: true,
      message: 'Item removed from work order',
      data: workOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Update work order
export const updateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, technician, notes } = req.body;

    const workOrder = await WorkOrder.findByIdAndUpdate(
      id,
      { status, technician, notes },
      { new: true, runValidators: true }
    ).populate('vehicle_id');

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found',
      });
    }

    res.json({
      success: true,
      message: 'Work order updated successfully',
      data: workOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Get active work orders (for dashboard)
export const getActiveWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find({
      status: { $in: ['in_progress', 'awaiting_parts'] },
    })
      .populate('vehicle_id')
      .sort({ started_at: -1 });

    res.json({
      success: true,
      count: workOrders.length,
      data: workOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
