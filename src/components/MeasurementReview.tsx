import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, User, Calendar } from "lucide-react";
import { Measurement } from "./MeasurementFlow";

interface MeasurementReviewProps {
  type: 'suit' | 'dress';
  measurements: Record<string, Measurement>;
  selectedStyles: any;
  onBack: () => void;
}

export const MeasurementReview = ({ 
  type, 
  measurements, 
  selectedStyles, 
  onBack 
}: MeasurementReviewProps) => {
  const measurementsByCategory = Object.values(measurements).reduce((acc, measurement) => {
    if (!acc[measurement.category]) {
      acc[measurement.category] = [];
    }
    acc[measurement.category].push(measurement);
    return acc;
  }, {} as Record<string, Measurement[]>);

  const categoryLabels: Record<string, string> = {
    basic: 'Basic Measurements',
    torso: 'Torso Measurements',
    upper: 'Upper Body',
    lower: 'Lower Body',
    length: 'Length Measurements',
  };

  const handleDownload = () => {
    // This would generate and download a PDF
    // For now, we'll just show a success message
    alert('PDF generation will be implemented with backend integration');
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Review Your Order</h2>
        <p className="text-lg text-muted-foreground">
          Verify all measurements and selections before downloading your PDF
        </p>
      </div>

      {/* Order Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Garment Type</h3>
              <p className="text-lg capitalize">{type === 'suit' ? "Men's Suit" : "Women's Dress"}</p>
              
              <h3 className="font-semibold mb-2 mt-4">Date</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate()}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Style Selections</h3>
              <div className="space-y-2">
                {selectedStyles.style && (
                  <Badge variant="default">{selectedStyles.style.name}</Badge>
                )}
                {selectedStyles.lapel && (
                  <Badge variant="default">{selectedStyles.lapel.name}</Badge>
                )}
                {selectedStyles.neckline && (
                  <Badge variant="default">{selectedStyles.neckline.name}</Badge>
                )}
                {selectedStyles.color && (
                  <Badge variant="secondary">{selectedStyles.color.name}</Badge>
                )}
                {selectedStyles.material && (
                  <Badge variant="outline">{selectedStyles.material.name}</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(categoryLabels).map(([category, label]) => {
            const categoryMeasurements = measurementsByCategory[category];
            if (!categoryMeasurements || categoryMeasurements.length === 0) return null;

            return (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className="font-semibold mb-3 text-primary">{label}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Measurement</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryMeasurements.map((measurement) => (
                      <TableRow key={measurement.id}>
                        <TableCell className="font-medium">{measurement.label}</TableCell>
                        <TableCell>{measurement.value}</TableCell>
                        <TableCell>{measurement.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* PDF Preview Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Professional PDF Report</h3>
            <p className="text-muted-foreground mb-4">
              Your measurements and style selections will be compiled into a professional PDF 
              that you can share with any tailor worldwide.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>✓ All measurements with units clearly labeled</p>
              <p>✓ Style selections and material choices</p>
              <p>✓ Professional layout ready for tailors</p>
              <p>✓ Date and order reference included</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button 
            onClick={handleDownload}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};