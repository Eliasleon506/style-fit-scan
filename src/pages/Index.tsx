import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Users, Download, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MeasurementFlow } from "@/components/MeasurementFlow";
import Navigation from "@/components/Navigation";
import hoiAnTailorBg from "@/assets/hoi-an-tailor-bg.jpg";

const Index = () => {
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measurementType, setMeasurementType] = useState<'suit' | 'dress' | null>(null);
  const [searchParams] = useSearchParams();

  const handleStartMeasurements = (type: 'suit' | 'dress') => {
    setMeasurementType(type);
    setShowMeasurements(true);
  };

  const handleBackToHome = () => {
    setShowMeasurements(false);
    setMeasurementType(null);
  };

  useEffect(() => {
    const startParam = searchParams.get('start');
    if (startParam === 'suit' || startParam === 'dress') {
      setMeasurementType(startParam);
      setShowMeasurements(true);
    }
  }, [searchParams]);

  if (showMeasurements && measurementType) {
    return <MeasurementFlow type={measurementType} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Background */}
      <section 
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${hoiAnTailorBg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-6 text-white">
              My<span className="text-craft-gold">AI</span>Tailor
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Professional measurements from home. Choose your style, colors, and materials. 
              Download a precision PDF for your tailor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => handleStartMeasurements('suit')}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
            >
              <Ruler className="mr-2 h-5 w-5" />
              Men's Suits
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleStartMeasurements('dress')}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8 py-4 text-lg"
            >
              <Ruler className="mr-2 h-5 w-5" />
              Women's Dresses
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Mirror + Helper</h3>
              <p className="text-sm text-muted-foreground">Use a full-length mirror and ask someone to help for best accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Soft Measuring Tape</h3>
              <p className="text-sm text-muted-foreground">Keep the tape level and snug, not tight. Fabric tape works best</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Light Clothing</h3>
              <p className="text-sm text-muted-foreground">Wear fitted undergarments or light clothing for accurate measurements</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of customers getting perfectly fitted garments made remotely
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => handleStartMeasurements('suit')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            >
              Start Men's Measurements
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleStartMeasurements('dress')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
            >
              Start Women's Measurements
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;