import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ruler, Info } from "lucide-react";

// Video URLs for measurement tutorials
const measurementVideos: Record<string, string> = {
  height: "https://www.youtube.com/embed/YQaGayH4v_E",
  neck: "https://www.youtube.com/embed/YQaGayH4v_E", 
  chest: "https://www.youtube.com/embed/YQaGayH4v_E",
  waist: "https://www.youtube.com/embed/YQaGayH4v_E",
  hips: "https://www.youtube.com/embed/YQaGayH4v_E",
  shoulder: "https://www.youtube.com/embed/YQaGayH4v_E",
  sleeve: "https://www.youtube.com/embed/YQaGayH4v_E",
  bicep: "https://www.youtube.com/embed/YQaGayH4v_E",
  wrist: "https://www.youtube.com/embed/YQaGayH4v_E",
  jacket_length: "https://www.youtube.com/embed/YQaGayH4v_E",
  inseam: "https://www.youtube.com/embed/YQaGayH4v_E",
  outseam: "https://www.youtube.com/embed/YQaGayH4v_E",
  thigh: "https://www.youtube.com/embed/YQaGayH4v_E",
  bust: "https://www.youtube.com/embed/p-dSzYE9YB0",
  under_bust: "https://www.youtube.com/embed/p-dSzYE9YB0",
  armpit_to_floor: "https://www.youtube.com/embed/p-dSzYE9YB0",
  waist_to_floor: "https://www.youtube.com/embed/p-dSzYE9YB0",
  shoulder_to_floor: "https://www.youtube.com/embed/p-dSzYE9YB0",
};

const getVideoUrl = (measurementId: string): string => {
  return measurementVideos[measurementId] || measurementVideos.height;
};

interface MeasurementStepProps {
  measurement: {
    id: string;
    label: string;
    instruction: string;
    category: string;
  };
  value: string;
  unit: 'cm' | 'in';
  onValueChange: (value: string) => void;
  onUnitChange: (unit: 'cm' | 'in') => void;
}

export const MeasurementStep = ({
  measurement,
  value,
  unit,
  onValueChange,
  onUnitChange,
}: MeasurementStepProps) => {
  return (
    <div className="space-y-6">
      {/* Measurement Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ruler className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{measurement.label}</h2>
        <p className="text-lg text-muted-foreground capitalize">
          {measurement.category} measurement
        </p>
      </div>

      {/* Instruction Card */}
      <Card className="bg-muted/50 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">How to measure</h3>
              <p className="text-muted-foreground">{measurement.instruction}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Keep the tape level and snug, not tight. Ask someone to help for best accuracy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Input */}
      <div className="max-w-md mx-auto">
        <Label htmlFor="measurement" className="text-base font-medium">
          Enter your {measurement.label.toLowerCase()} measurement
        </Label>
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <Input
              id="measurement"
              type="number"
              step="0.1"
              placeholder={`e.g., ${unit === 'cm' ? '175' : '69'}`}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className="text-lg h-12"
            />
          </div>
          <div className="flex rounded-md border border-input overflow-hidden">
            <Button
              type="button"
              variant={unit === 'cm' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onUnitChange('cm')}
              className="rounded-none px-4 h-12"
            >
              cm
            </Button>
            <Button
              type="button"
              variant={unit === 'in' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onUnitChange('in')}
              className="rounded-none px-4 h-12"
            >
              in
            </Button>
          </div>
        </div>
        {value && (
          <p className="text-sm text-muted-foreground mt-2">
            {unit === 'cm' 
              ? `≈ ${(parseFloat(value) / 2.54).toFixed(1)} inches`
              : `≈ ${(parseFloat(value) * 2.54).toFixed(1)} cm`
            }
          </p>
        )}
      </div>

      {/* Video Helper */}
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">How to measure: {measurement.label}</h3>
        <div className="w-full max-w-md mx-auto">
          <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden border border-primary/20">
            <iframe
              width="100%"
              height="100%"
              src={getVideoUrl(measurement.id)}
              title={`How to measure ${measurement.label}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Watch this quick tutorial for accurate measurement
          </p>
        </div>
      </div>
    </div>
  );
};