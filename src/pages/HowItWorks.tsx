import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Palette, Download, CheckCircle, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Ruler className="w-8 h-8 text-primary" />,
      title: "Take Your Measurements",
      description: "Follow our guided video tutorials to take accurate body measurements at home",
      details: [
        "Watch instructional videos for each measurement",
        "Use a soft measuring tape for best results",
        "Have someone help you for hard-to-reach areas",
        "Take measurements over light clothing"
      ]
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "Choose Your Style",
      description: "Select from our curated collection of suits and dresses with premium materials",
      details: [
        "Browse classic and contemporary styles",
        "Choose from premium fabrics and colors",
        "Add personal touches and customizations",
        "Upload reference images if needed"
      ]
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Download Your Profile",
      description: "Get a professional PDF with all your measurements and style preferences",
      details: [
        "Complete measurement chart with units",
        "Style selections and material choices",
        "Professional tailor-ready format",
        "Save to your account for future orders"
      ]
    }
  ];

  const tips = [
    {
      icon: <CheckCircle className="w-5 h-5 text-craft-sage" />,
      title: "Accuracy Tips",
      description: "Measure twice, order once. Take your time for the best results."
    },
    {
      icon: <Clock className="w-5 h-5 text-craft-sage" />,
      title: "Best Time",
      description: "Take measurements in the morning when your body is most consistent."
    },
    {
      icon: <Shield className="w-5 h-5 text-craft-sage" />,
      title: "Privacy First",
      description: "Your measurements are private and securely stored."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Professional Tailoring</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get perfectly fitted garments in three simple steps. Our digital measuring process 
            ensures professional results from the comfort of your home.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-craft-sage mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-craft-linen/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Pro Tips for Perfect Measurements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Measurement Guide */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What You'll Need</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Essential Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Soft measuring tape (cloth or plastic)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Full-length mirror
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Helper (recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Form-fitting clothes
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Preparation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Wear light, form-fitting clothing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Stand in good lighting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Remove shoes for height measurement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-craft-sage" />
                    Maintain good posture
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Begin your measurement journey and create your perfect garment profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/?start=suit">Start Men's Suit Measurements</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/?start=dress">Start Women's Dress Measurements</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;