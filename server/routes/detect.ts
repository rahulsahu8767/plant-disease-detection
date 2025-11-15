import { RequestHandler } from "express";
import { detectPlantDisease } from "../ml/plantClassifier";

export const handleDetect: RequestHandler = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Validate file type
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "File must be an image" });
    }

    // Run TensorFlow.js detection
    const result = await detectPlantDisease(req.file.buffer);

    // Return results
    res.json(result);
  } catch (error) {
    console.error("Detection error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to process image",
    });
  }
};
