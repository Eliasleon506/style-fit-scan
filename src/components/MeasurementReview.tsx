import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, User, Calendar, Languages } from "lucide-react";
import { Measurement } from "./MeasurementFlow";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const [pdfLanguage, setPdfLanguage] = useState<'en' | 'vi'>('en');
  
  const measurementsByCategory = Object.values(measurements).reduce((acc, measurement) => {
    if (!acc[measurement.category]) {
      acc[measurement.category] = [];
    }
    acc[measurement.category].push(measurement);
    return acc;
  }, {} as Record<string, Measurement[]>);

  const translations = {
    en: {
      title: "Custom Tailoring Measurements",
      orderDate: "Order Date",
      garmentType: "Garment Type",
      mensSuit: "Men's Suit",
      womensDress: "Women's Dress",
      styleSelections: "Style Selections",
      measurements: "Measurements",
      measurement: "Measurement",
      value: "Value",
      unit: "Unit",
      style: "Style",
      lapel: "Lapel",
      neckline: "Neckline",
      color: "Color",
      material: "Material",
      lining: "Lining",
      page: "Page",
      of: "of",
      categories: {
        basic: 'Basic Measurements',
        torso: 'Torso Measurements',
        upper: 'Upper Body',
        lower: 'Lower Body',
        length: 'Length Measurements',
      }
    },
    vi: {
      title: "Số Đo May Đo",
      orderDate: "Ngày Đặt",
      garmentType: "Loại Trang Phục",
      mensSuit: "Bộ Vest Nam",
      womensDress: "Váy Nữ",
      styleSelections: "Lựa Chọn Kiểu Dáng",
      measurements: "Số Đo",
      measurement: "Số Đo",
      value: "Giá Trị",
      unit: "Đơn Vị",
      style: "Kiểu",
      lapel: "Ve Áo",
      neckline: "Cổ Áo",
      color: "Màu",
      material: "Chất Liệu",
      lining: "Lót",
      page: "Trang",
      of: "của",
      categories: {
        basic: 'Số Đo Cơ Bản',
        torso: 'Số Đo Thân',
        upper: 'Phần Trên',
        lower: 'Phần Dưới',
        length: 'Số Đo Chiều Dài',
      }
    }
  };

  const categoryLabels: Record<string, string> = {
    basic: 'Basic Measurements',
    torso: 'Torso Measurements',
    upper: 'Upper Body',
    lower: 'Lower Body',
    length: 'Length Measurements',
  };

  const handleDownload = () => {
    try {
      const t = translations[pdfLanguage];
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(t.title, pageWidth / 2, 20, { align: "center" });
      
      // Date and Order Info
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${t.orderDate}: ${formatDate()}`, 14, 35);
      doc.text(`${t.garmentType}: ${type === 'suit' ? t.mensSuit : t.womensDress}`, 14, 41);
      
      let yPosition = 50;
      
      // Style Selections
      if (selectedStyles && Object.keys(selectedStyles).length > 0) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(t.styleSelections, 14, yPosition);
        yPosition += 7;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        const styleEntries = [
          selectedStyles.style && `${t.style}: ${selectedStyles.style.name}`,
          selectedStyles.lapel && `${t.lapel}: ${selectedStyles.lapel.name}`,
          selectedStyles.neckline && `${t.neckline}: ${selectedStyles.neckline.name}`,
          selectedStyles.color && `${t.color}: ${selectedStyles.color.name}`,
          selectedStyles.material && `${t.material}: ${selectedStyles.material.name}`,
          selectedStyles.lining && `${t.lining}: ${selectedStyles.lining.name}`,
        ].filter(Boolean);
        
        styleEntries.forEach((entry) => {
          doc.text(entry as string, 14, yPosition);
          yPosition += 6;
        });
        
        yPosition += 5;
      }
      
      // Measurements by Category
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t.measurements, 14, yPosition);
      yPosition += 7;
      
      Object.entries(categoryLabels).forEach(([category, label]) => {
        const categoryMeasurements = measurementsByCategory[category];
        if (!categoryMeasurements || categoryMeasurements.length === 0) return;
        
        // Category title
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(t.categories[category as keyof typeof t.categories], 14, yPosition);
        yPosition += 5;
        
        // Create table data
        const tableData = categoryMeasurements.map((measurement) => [
          measurement.label,
          measurement.value,
          measurement.unit,
        ]);
        
        autoTable(doc, {
          startY: yPosition,
          head: [[t.measurement, t.value, t.unit]],
          body: tableData,
          theme: "striped",
          headStyles: { fillColor: [66, 66, 66] },
          margin: { left: 14, right: 14 },
          styles: { fontSize: 9 },
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 10;
        
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.text(
          `${t.page} ${i} ${t.of} ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
      
      // Save the PDF
      const fileName = `measurements-${type}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      toast({
        title: "PDF Downloaded",
        description: "Your measurement PDF has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
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
          <Button 
            variant="outline"
            onClick={() => setPdfLanguage(pdfLanguage === 'en' ? 'vi' : 'en')}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {pdfLanguage === 'en' ? 'Vietnamese' : 'English'}
          </Button>
          <Button variant="outline">
            Save Draft
          </Button>
          <Button 
            onClick={handleDownload}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF ({pdfLanguage === 'en' ? 'EN' : 'VI'})
          </Button>
        </div>
      </div>
    </div>
  );
};