import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
  name: String,
  dose: String,
  time: String,
  taken: Boolean,
}, {
  timestamps: true
});         


export default mongoose.models.Medication ||
  mongoose.model("Medication", MedicationSchema);