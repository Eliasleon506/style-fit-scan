import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Users, Download, CheckCircle } from "lucide-react";
import { useState } from "react";
import { MeasurementFlow } from "@/components/MeasurementFlow";

const Index = () => {
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measurementType, setMeasurementType] = useState<'suit' | 'dress' | null>(null);

  const handleStartMeasurements = (type: 'suit' | 'dress') => {
    setMeasurementType(type);
    setShowMeasurements(true);
  };

  const handleBackToHome = () => {
    setShowMeasurements(false);
    setMeasurementType(null);
  };

  if (showMeasurements && measurementType) {
    return <MeasurementFlow type={measurementType} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              My<span className="text-primary">AI</span>Tailor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Professional measurements from home. Choose your style, colors, and materials. 
              Download a precision PDF for your tailor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => handleStartMeasurements('suit')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            >
              <Ruler className="mr-2 h-5 w-5" />
              Men's Suits
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleStartMeasurements('dress')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
            >
              <Ruler className="mr-2 h-5 w-5" />
              Women's Dresses
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
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

      {/* Process Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="craft-section text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>1. Precise Measurements</CardTitle>
                <CardDescription>
                  Follow our guided process to capture 12-15 key measurements with visual guides and helpful tips
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="craft-section text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>2. Choose Your Style</CardTitle>
                <CardDescription>
                  Select from curated suit styles, dress silhouettes, colors, and premium materials in our digital atelier
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="craft-section text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>3. Download PDF</CardTitle>
                <CardDescription>
                  Get a professional measurement sheet with your selections, ready to share with any tailor worldwide
                </CardDescription>
              </CardHeader>
            </Card>
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