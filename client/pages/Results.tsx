import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, AlertTriangle, CheckCircle, ArrowLeft, Download } from "lucide-react";
import { useState } from "react";

interface DetectionResult {
  disease: string;
  confidence: number;
  treatment: string[];
  prevention: string[];
  severity: "low" | "medium" | "high";
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { detection, image } = location.state || {};
  const [downloading, setDownloading] = useState(false);

  if (!detection || !image) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
        <nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-green-200/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline">LeafGuard</span>
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-xl text-foreground/60 mb-6">No detection results found</p>
            <Link
              to="/detect"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4" />
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-foreground";
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-orange-50 border-orange-200";
      case "low":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "high" || severity === "medium") {
      return <AlertTriangle className="w-6 h-6" />;
    }
    return <CheckCircle className="w-6 h-6" />;
  };

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      const element = document.getElementById("report");
      if (element) {
        const html = element.innerHTML;
        const printWindow = window.open("", "", "height=600,width=800");
        if (printWindow) {
          printWindow.document.write("<html><head><title>Plant Disease Report</title>");
          printWindow.document.write(
            "<style>body{font-family:Arial;margin:20px;}h1{color:#2d5016;}h2{color:#2d5016;margin-top:20px;}p{line-height:1.6;}</style>"
          );
          printWindow.document.write("</head><body>");
          printWindow.document.write(html);
          printWindow.document.write("</body></html>");
          printWindow.document.close();
          printWindow.print();
        }
      }
      setDownloading(false);
    }, 500);
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
          <Link
            to="/detect"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Scan Another
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div id="report" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Analysis Results
          </h1>
          <p className="text-lg text-foreground/60">
            Plant disease detection and treatment recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
              <img
                src={image}
                alt="Analyzed plant"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Detection Summary */}
          <div className="animate-fade-in space-y-6">
            <div
              className={`p-6 rounded-xl border-2 ${getSeverityBgColor(
                detection.severity
              )}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground/60 mb-1">
                    DETECTED DISEASE
                  </p>
                  <h2 className={`text-3xl font-bold ${getSeverityColor(
                    detection.severity
                  )}`}>
                    {detection.disease}
                  </h2>
                </div>
                <div className={getSeverityColor(detection.severity)}>
                  {getSeverityIcon(detection.severity)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Confidence Level</span>
                  <span className="font-bold text-primary">
                    {Math.round(detection.confidence * 100)}%
                  </span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${detection.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/50 border border-green-200/30 rounded-xl">
              <p className="text-sm font-semibold text-foreground/60 mb-2">SEVERITY LEVEL</p>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-lg font-bold text-white ${
                  detection.severity === 'high' ? 'bg-red-500' :
                  detection.severity === 'medium' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}>
                  {detection.severity.toUpperCase()}
                </span>
                <p className="text-foreground/60">
                  {detection.severity === 'high' && 'Immediate action recommended'}
                  {detection.severity === 'medium' && 'Treatment should be applied soon'}
                  {detection.severity === 'low' && 'Monitor and maintain good practices'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Section */}
        <div className="bg-white/50 border border-green-200/30 rounded-xl p-8 mb-8 animate-slide-up">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            Recommended Treatment
          </h3>
          <ul className="space-y-3">
            {detection.treatment.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-4 p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-foreground/70 pt-0.5">{step}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Prevention Section */}
        <div className="bg-white/50 border border-green-200/30 rounded-xl p-8 mb-8 animate-slide-up">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Leaf className="w-6 h-6" />
            Prevention Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {detection.prevention.map((tip: string, i: number) => (
              <div key={i} className="p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                <p className="text-foreground/70">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {downloading ? "Preparing Report..." : "Download Report"}
          </button>
        </div>

        {/* Additional Info */}
        <div className="p-6 bg-blue-50 border border-blue-200/30 rounded-xl text-center">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> For best results, apply treatment as soon as possible and monitor your plant's progress daily.
          </p>
        </div>
      </div>
    </div>
  );
}
