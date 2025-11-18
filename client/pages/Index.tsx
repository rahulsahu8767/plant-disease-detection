import { Link } from "react-router-dom";
import { Leaf, Zap, Shield, BarChart3, ArrowRight } from "lucide-react";

export default function Index() {
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
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            Start Detection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full border border-secondary/30">
              <p className="text-sm font-semibold text-primary">🌱 AI-Powered Plant Health</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Detect Plant <span className="text-accent">Diseases</span> Instantly
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-lg leading-relaxed">
              Use AI-powered image recognition to identify plant diseases in seconds. Get instant analysis and treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/detect"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg text-center"
              >
                Upload Plant Image
              </Link>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                <a href="https://apsjournals.apsnet.org/page/pdis/about">Learn More</a> 
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-secondary to-primary/20 rounded-2xl p-8 border border-secondary/30 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-32 h-32 text-primary/30 mx-auto mb-4 animate-bounce" />
                  <p className="text-foreground/60 font-semibold">AI Disease Detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Everything you need to protect your plants and maximize yields
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-xl border border-green-200/30 bg-white/50 backdrop-blur hover:shadow-lg hover:border-primary/50 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Instant Detection</h3>
            <p className="text-foreground/60">
              Get results in seconds using advanced machine learning models trained on thousands of plant diseases.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-xl border border-green-200/30 bg-white/50 backdrop-blur hover:shadow-lg hover:border-primary/50 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Treatment Guidance</h3>
            <p className="text-foreground/60">
              Receive detailed treatment recommendations and prevention tips for each identified disease.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-xl border border-green-200/30 bg-white/50 backdrop-blur hover:shadow-lg hover:border-primary/50 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Accuracy Tracking</h3>
            <p className="text-foreground/60">
              Track detection accuracy and confidence levels with detailed analysis reports for each scan.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Upload Image", desc: "Take a photo of your plant or upload from your device" },
            { step: "2", title: "AI Analysis", desc: "Our AI analyzes the image in real-time" },
            { step: "3", title: "Disease Detection", desc: "Identifies any diseases or health issues present" },
            { step: "4", title: "Get Treatment", desc: "Receive detailed care and treatment recommendations" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-primary font-bold text-xl rounded-full mb-4 mx-auto">
                {item.step}
              </div>
              <h3 className="font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-foreground/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary to-secondary/80 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Protect Your Plants?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start detecting plant diseases in seconds with our AI-powered analysis system.
          </p>
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-200/30 bg-white/30 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-bold text-primary">LeafGuard</span>
            </div>
            <p className="text-sm text-foreground/60">
              © 2025 LeafGuard. AI-powered plant disease detection. <br />
              By Rahul Sahu & Group
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
