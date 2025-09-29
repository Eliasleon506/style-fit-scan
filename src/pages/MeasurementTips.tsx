import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Ruler, 
  Users, 
  Clock, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Camera,
  ShirtIcon as Shirt,
  Timer
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const MeasurementTips = () => {
  const essentialTips = [
    {
      icon: <Ruler className="w-6 h-6 text-primary" />,
      title: "Use a Soft Measuring Tape",
      description: "A flexible cloth or plastic measuring tape gives the most accurate results. Avoid metal tapes.",
      details: [
        "Cloth measuring tapes are preferred for body measurements",
        "Check that your tape isn't stretched or damaged",
        "Start with the tape at zero, not at the metal end piece"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Get Help from Someone",
      description: "Having an assistant ensures measurements are taken straight and at the right position.",
      details: [
        "Ask someone to help with back measurements",
        "They can ensure the tape is level and parallel to the floor",
        "Having help reduces measurement errors significantly"
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "Use a Full-Length Mirror",
      description: "A good mirror helps you check tape placement and maintain proper posture.",
      details: [
        "Stand in front of a full-length mirror",
        "Check that the tape is horizontal for circumference measurements",
        "Ensure you're standing straight with good posture"
      ]
    },
    {
      icon: <Shirt className="w-6 h-6 text-primary" />,
      title: "Wear Appropriate Clothing",
      description: "Light, form-fitting clothes or undergarments give the most accurate measurements.",
      details: [
        "Wear well-fitting undergarments or fitted clothing",
        "Avoid bulky clothing, belts, or accessories",
        "Remove shoes for height and inseam measurements"
      ]
    }
  ];

  const measurementTechniques = [
    {
      title: "Circumference Measurements",
      description: "For chest, waist, hips, neck, etc.",
      tips: [
        "Keep the tape parallel to the floor",
        "The tape should be snug but not tight",
        "You should be able to slide one finger under the tape",
        "Don't pull the tape so tight it compresses your body",
        "Take measurements on bare skin or over light clothing"
      ]
    },
    {
      title: "Length Measurements", 
      description: "For sleeve length, inseam, jacket length, etc.",
      tips: [
        "Measure in a straight line between two points",
        "Keep your arms relaxed at your sides",
        "Stand up straight with shoulders relaxed",
        "For sleeve length, slightly bend your arm at the elbow",
        "Mark measurement points with a washable pen if needed"
      ]
    },
    {
      title: "Width Measurements",
      description: "For shoulder width, back width, etc.", 
      tips: [
        "Measure across the widest or specified points",
        "Keep shoulders relaxed and in natural position",
        "Don't stretch or compress the area being measured",
        "Take measurements from the back when possible",
        "Have your helper check the tape is straight"
      ]
    }
  ];

  const commonMistakes = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      mistake: "Measuring Over Thick Clothing",
      solution: "Always measure over light clothing or directly on skin"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      mistake: "Pulling Tape Too Tight",
      solution: "The tape should be snug but not compress your body"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      mistake: "Poor Posture While Measuring",
      solution: "Stand straight with shoulders relaxed and arms at sides"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      mistake: "Measuring at Wrong Time of Day",
      solution: "Take measurements in the morning when your body is least swollen"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      mistake: "Not Double-Checking Measurements",
      solution: "Always measure twice to ensure accuracy"
    }
  ];

  const proTips = [
    {
      icon: <Lightbulb className="w-5 h-5 text-craft-sage" />,
      tip: "Best Time to Measure",
      description: "Take measurements in the morning when your body is least bloated"
    },
    {
      icon: <Camera className="w-5 h-5 text-craft-sage" />,
      tip: "Document Your Process", 
      description: "Take photos of challenging measurements for future reference"
    },
    {
      icon: <Timer className="w-5 h-5 text-craft-sage" />,
      tip: "Take Your Time",
      description: "Rushing leads to errors. Allow 15-20 minutes for the full process"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-craft-sage" />,
      tip: "Measure Twice",
      description: "Always take each measurement twice and use the average if they differ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Expert Guidance</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Measurement Tips & Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional tips to ensure you get the most accurate measurements at home. 
            Follow these guidelines for perfect results every time.
          </p>
        </div>

        {/* Essential Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Essential Equipment & Setup</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {essentialTips.map((tip, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      {tip.icon}
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.details.map((detail, detailIndex) => (
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
        </section>

        {/* Measurement Techniques */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Measurement Techniques</h2>
          <div className="space-y-6">
            {measurementTechniques.map((technique, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{technique.title}</CardTitle>
                  <CardDescription className="text-base">{technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {technique.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-craft-sage mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Common Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonMistakes.map((item, index) => (
              <Card key={index} className="border-destructive/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    {item.icon}
                    <div className="space-y-2">
                      <h3 className="font-medium text-destructive">{item.mistake}</h3>
                      <p className="text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <div className="bg-craft-linen/30 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Pro Tips from Expert Tailors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {proTips.map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{tip.tip}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Checklist */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Pre-Measurement Checklist</CardTitle>
              <CardDescription className="text-center">
                Make sure you have everything ready before you start
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-craft-sage" />
                    Equipment Ready
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Soft measuring tape
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Full-length mirror
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Helper available
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Good lighting
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-craft-sage" />
                    Personal Preparation
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Wearing appropriate clothing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Good posture maintained
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Relaxed shoulders and arms
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-craft-sage rounded-full"></div>
                      Plenty of time allocated
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Take Your Measurements?</h2>
          <p className="text-muted-foreground mb-6">
            Now that you know the best practices, start your measurement journey.
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

export default MeasurementTips;