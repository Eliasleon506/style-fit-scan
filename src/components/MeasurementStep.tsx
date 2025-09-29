import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ruler, Info } from "lucide-react";

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

      {/* Visual Helper */}
      <div className="text-center">
        <div className="w-32 h-48 bg-muted/30 rounded-lg border-2 border-dashed border-primary/30 mx-auto flex items-center justify-center">
          <div className="text-center">
            <Ruler className="h-8 w-8 text-primary/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Visual guide</p>
            <p className="text-xs text-muted-foreground">(Coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};