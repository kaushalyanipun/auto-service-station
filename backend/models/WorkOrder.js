import mongoose from 'mongoose';

const workOrderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => Date.now().toString(),
  },
  product_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const workOrderSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    status: {
      type: String,
      enum: ['in_progress', 'awaiting_parts', 'ready_to_bill', 'completed'],
      default: 'in_progress',
    },
    items: [workOrderItemSchema],
    running_total: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    technician: {
      type: String,
      trim: true,
    },
    started_at: {
      type: Date,
      default: Date.now,
    },
    completed_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Calculate running total before saving
workOrderSchema.pre('save', function (next) {
  this.running_total = this.items.reduce((total, item) => {
    return total + (item.unit_price * item.quantity);
  }, 0);
  next();
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

export default WorkOrder;
