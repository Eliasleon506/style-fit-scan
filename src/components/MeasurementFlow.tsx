import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MeasurementStep } from "./MeasurementStep";
import { StyleSelection } from "./StyleSelection";
import { MeasurementReview } from "./MeasurementReview";

interface MeasurementFlowProps {
  type: 'suit' | 'dress';
  onBack: () => void;
}

export interface Measurement {
  id: string;
  label: string;
  value: string;
  unit: 'cm' | 'in';
  instruction: string;
  category: string;
}

const suitMeasurements = [
  { id: 'height', label: 'Height', instruction: 'Stand straight against a wall, measure from top of head to floor', category: 'basic' },
  { id: 'neck', label: 'Neck', instruction: 'Measure around the base of neck where collar sits', category: 'basic' },
  { id: 'chest', label: 'Chest', instruction: 'Measure around the fullest part of chest, arms relaxed at sides', category: 'torso' },
  { id: 'waist', label: 'Waist', instruction: 'Measure around natural waistline, usually just above hip bones', category: 'torso' },
  { id: 'hips', label: 'Hips', instruction: 'Measure around the widest part of hips and bottom', category: 'torso' },
  { id: 'shoulder', label: 'Shoulder Width', instruction: 'Measure across back from edge to edge of shoulders', category: 'upper' },
  { id: 'sleeve', label: 'Sleeve Length', instruction: 'From shoulder point to wrist bone, arm slightly bent', category: 'upper' },
  { id: 'bicep', label: 'Bicep', instruction: 'Around the widest part of upper arm', category: 'upper' },
  { id: 'wrist', label: 'Wrist', instruction: 'Around the fullest part of wrist', category: 'upper' },
  { id: 'jacket_length', label: 'Jacket Length', instruction: 'From base of neck to desired jacket length', category: 'length' },
  { id: 'inseam', label: 'Inseam', instruction: 'From crotch to ankle bone', category: 'lower' },
  { id: 'outseam', label: 'Outseam', instruction: 'From natural waist to bottom of trouser leg', category: 'lower' },
  { id: 'thigh', label: 'Thigh', instruction: 'Around the thickest part of upper leg', category: 'lower' },
];

const dressMeasurements = [
  { id: 'height', label: 'Height', instruction: 'Stand straight against a wall, measure from top of head to floor', category: 'basic' },
  { id: 'bust', label: 'Bust', instruction: 'Measure around the fullest part of bust', category: 'torso' },
  { id: 'under_bust', label: 'Under Bust', instruction: 'Measure directly below the bust', category: 'torso' },
  { id: 'waist', label: 'Waist', instruction: 'Measure around natural waistline', category: 'torso' },
  { id: 'hips', label: 'Hips', instruction: 'Measure around the widest point of hips', category: 'torso' },
  { id: 'armpit_to_floor', label: 'Armpit to Floor', instruction: 'From armpit straight down to floor', category: 'length' },
  { id: 'waist_to_floor', label: 'Waist to Floor', instruction: 'From natural waist to floor', category: 'length' },
  { id: 'shoulder_to_floor', label: 'Shoulder to Floor', instruction: 'From shoulder point to floor', category: 'length' },
];

export const MeasurementFlow = ({ type, onBack }: MeasurementFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [measurements, setMeasurements] = useState<Record<string, Measurement>>({});
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [selectedStyles, setSelectedStyles] = useState<any>({});

  const measurementList = type === 'suit' ? suitMeasurements : dressMeasurements;
  const totalSteps = measurementList.length + 2; // measurements + style selection + review
  const progress = (currentStep / totalSteps) * 100;

  const handleMeasurementUpdate = (measurementId: string, value: string) => {
    const measurementDef = measurementList.find(m => m.id === measurementId);
    if (measurementDef) {
      setMeasurements(prev => ({
        ...prev,
        [measurementId]: {
          id: measurementId,
          label: measurementDef.label,
          value,
          unit,
          instruction: measurementDef.instruction,
          category: measurementDef.category,
        }
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    if (currentStep < measurementList.length) {
      const currentMeasurement = measurementList[currentStep];
      return measurements[currentMeasurement.id]?.value && measurements[currentMeasurement.id]?.value.trim() !== '';
    }
    return true;
  };

  const renderCurrentStep = () => {
    if (currentStep < measurementList.length) {
      const measurement = measurementList[currentStep];
      return (
        <MeasurementStep
          measurement={measurement}
          value={measurements[measurement.id]?.value || ''}
          unit={unit}
          onValueChange={(value) => handleMeasurementUpdate(measurement.id, value)}
          onUnitChange={setUnit}
        />
      );
    } else if (currentStep === measurementList.length) {
      return (
        <StyleSelection
          type={type}
          selectedStyles={selectedStyles}
          onStyleChange={setSelectedStyles}
        />
      );
    } else {
      return (
        <MeasurementReview
          type={type}
          measurements={measurements}
          selectedStyles={selectedStyles}
          onBack={onBack}
        />
      );
    }
  };

  const getStepTitle = () => {
    if (currentStep < measurementList.length) {
      return `Measurement ${currentStep + 1} of ${measurementList.length}`;
    } else if (currentStep === measurementList.length) {
      return 'Choose Your Style';
    } else {
      return 'Review & Download';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {type === 'suit' ? "Men's Suit" : "Women's Dress"} Measurements
            </h1>
            <p className="text-muted-foreground">{getStepTitle()}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="craft-section">
          <CardContent className="p-8">
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < totalSteps - 1 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="bg-primary hover:bg-primary/90"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};