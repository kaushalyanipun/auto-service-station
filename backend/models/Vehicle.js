import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    plate_number: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    owner_name: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_type: {
      type: String,
      enum: ['Car', 'Motorcycle', 'Truck', 'Van'],
      default: 'Car',
    },
    status: {
      type: String,
      enum: ['in_progress', 'awaiting_parts', 'ready_to_bill', 'completed'],
      default: 'in_progress',
    },
    started_at: {
      type: Date,
      default: Date.now,
    },
    completed_at: {
      type: Date,
      default: null,
    },
    contact_number: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
