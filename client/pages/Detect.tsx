import { Link, useNavigate } from "react-router-dom";
import { Leaf, Upload, Loader, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function Detect() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setError(null);
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDetect = async () => {
    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Detection failed. Please try again.");
      }

      const result = await response.json();
      
      // Navigate to results page with the detection data
      navigate("/results", { state: { detection: result, image } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-green-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">LeafGuard</span>
          </Link>
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 text-center animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Upload Your Plant
          </h1>
          <p className="text-xl text-foreground/60">
            Take a clear photo of your plant and our AI will analyze it for diseases
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Upload Area */}
          <div className="animate-fade-in">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-primary/30 rounded-2xl p-12 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Selected plant"
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setImageFile(null);
                      setError(null);
                    }}
                    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-16 h-16 text-primary/40 mx-auto mb-4 group-hover:text-primary/60 transition-colors" />
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-foreground/60 mb-4">
                    or click to browse your computer
                  </p>
                  <p className="text-sm text-foreground/50">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Tips for Best Results</h2>
              <ul className="space-y-3">
                {[
                  "Use clear, well-lit photos of affected plant areas",
                  "Show the disease symptoms clearly",
                  "Avoid blurry or dark images",
                  "Include leaves, stems, or fruit showing the issue",
                  "Use a plain background if possible",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-secondary/10 border border-secondary/30 rounded-lg">
              <h3 className="font-bold text-primary mb-2">How our AI works</h3>
              <p className="text-sm text-foreground/60">
                Our machine learning model has been trained on thousands of plant images to identify common diseases with high accuracy. Each detection includes confidence levels and treatment recommendations.
              </p>
            </div>

            {/* Detect Button */}
            <button
              onClick={handleDetect}
              disabled={!image || loading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                image && !loading
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Detect Disease
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
