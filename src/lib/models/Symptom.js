import mongoose from "mongoose";

const SymptomSchema = new mongoose.Schema({
  text: String,
  date: { type: String, default: new Date().toLocaleDateString("bn-BD") },
});

export default mongoose.models.Symptom ||
  mongoose.model("Symptom", SymptomSchema);