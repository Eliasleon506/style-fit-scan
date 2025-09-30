import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Shirt, Package, Layers, Upload } from "lucide-react";
import { toast } from "sonner";

// Import style images
import suitTwoPiece from "@/assets/suit-two-piece.jpg";
import suitThreePiece from "@/assets/suit-three-piece.jpg";
import suitDinnerJacket from "@/assets/suit-dinner-jacket.jpg";
import suitSingleBreasted from "@/assets/suit-single-breasted.jpg";
import suitDoubleBreasted from "@/assets/suit-double-breasted.jpg";
import suitSlimFit from "@/assets/suit-slim-fit.jpg";
import suitTuxedo from "@/assets/suit-tuxedo.jpg";
import lapelNotched from "@/assets/lapel-notched.jpg";
import lapelPeaked from "@/assets/lapel-peaked.jpg";
import lapelShawl from "@/assets/lapel-shawl.jpg";
import dressALine from "@/assets/dress-a-line.jpg";
import dressSheath from "@/assets/dress-sheath.jpg";
import dressMermaid from "@/assets/dress-mermaid.jpg";
import dressBallGown from "@/assets/dress-ball-gown.jpg";
import dressEmpire from "@/assets/dress-empire.jpg";
import dressTrumpet from "@/assets/dress-trumpet.jpg";
import dressColumn from "@/assets/dress-column.jpg";
import dressTeaLength from "@/assets/dress-tea-length.jpg";
import dressPrincess from "@/assets/dress-princess.jpg";
import dressHighLow from "@/assets/dress-high-low.jpg";
import necklineScoop from "@/assets/neckline-scoop.jpg";
import necklineVneck from "@/assets/neckline-vneck.jpg";
import necklineOffShoulder from "@/assets/neckline-off-shoulder.jpg";
import necklineHighNeck from "@/assets/neckline-high-neck.jpg";

// Import fabric images
import fabricWool from "@/assets/fabric-wool.jpg";
import fabricLinen from "@/assets/fabric-linen.jpg";
import fabricCotton from "@/assets/fabric-cotton.jpg";
import fabricSilk from "@/assets/fabric-silk.jpg";
import fabricCashmere from "@/assets/fabric-cashmere.jpg";
import fabricVelvet from "@/assets/fabric-velvet.jpg";
import fabricTweed from "@/assets/fabric-tweed.jpg";

// Import lining images
import liningPaisley from "@/assets/lining-paisley.jpg";
import liningStriped from "@/assets/lining-striped.jpg";
import liningFloral from "@/assets/lining-floral.jpg";
import liningSolid from "@/assets/lining-solid.jpg";

interface StyleSelectionProps {
  type: 'suit' | 'dress';
  selectedStyles: any;
  onStyleChange: (styles: any) => void;
}

const suitStyles = [
  { id: 'two-piece', name: 'Two-Piece', description: 'Classic jacket and trousers', image: suitTwoPiece },
  { id: 'three-piece', name: 'Three-Piece', description: 'Jacket, waistcoat, and trousers', image: suitThreePiece },
  { id: 'single-breasted', name: 'Single-Breasted', description: 'Modern business style', image: suitSingleBreasted },
  { id: 'double-breasted', name: 'Double-Breasted', description: 'Bold formal statement', image: suitDoubleBreasted },
  { id: 'slim-fit', name: 'Slim Fit', description: 'Contemporary tailored cut', image: suitSlimFit },
  { id: 'tuxedo', name: 'Tuxedo', description: 'Black tie perfection', image: suitTuxedo },
  { id: 'dinner-jacket', name: 'Dinner Jacket', description: 'Formal evening wear', image: suitDinnerJacket },
];

const suitLapels = [
  { id: 'notched', name: 'Notched Lapel', description: 'Traditional business style', image: lapelNotched },
  { id: 'peaked', name: 'Peaked Lapel', description: 'Formal and elegant', image: lapelPeaked },
  { id: 'shawl', name: 'Shawl Lapel', description: 'Smooth curved design', image: lapelShawl },
];

const dressStyles = [
  { id: 'a-line', name: 'A-Line', description: 'Classic fitted bodice, flared skirt', image: dressALine },
  { id: 'ball-gown', name: 'Ball Gown', description: 'Full skirt, fitted bodice', image: dressBallGown },
  { id: 'mermaid', name: 'Mermaid', description: 'Fitted through hips, flared bottom', image: dressMermaid },
  { id: 'sheath', name: 'Sheath', description: 'Sleek and fitted silhouette', image: dressSheath },
  { id: 'empire', name: 'Empire Waist', description: 'High waist, flowing skirt', image: dressEmpire },
  { id: 'trumpet', name: 'Trumpet', description: 'Fit-and-flare elegance', image: dressTrumpet },
  { id: 'column', name: 'Column', description: 'Straight, sleek silhouette', image: dressColumn },
  { id: 'tea-length', name: 'Tea-Length', description: 'Elegant midi length', image: dressTeaLength },
  { id: 'princess', name: 'Princess Cut', description: 'Fitted bodice, full skirt', image: dressPrincess },
  { id: 'high-low', name: 'High-Low', description: 'Asymmetrical hemline', image: dressHighLow },
];

const dressNecklines = [
  { id: 'scoop', name: 'Scoop Neck', description: 'Classic rounded neckline', image: necklineScoop },
  { id: 'v-neck', name: 'V-Neck', description: 'Elegant V-shaped neckline', image: necklineVneck },
  { id: 'off-shoulder', name: 'Off-Shoulder', description: 'Romantic off-shoulder style', image: necklineOffShoulder },
  { id: 'high-neck', name: 'High Neck', description: 'Modern high neckline', image: necklineHighNeck },
];

const colors = [
  { id: 'navy', name: 'Navy Blue', hex: '#1e3a8a' },
  { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'burgundy', name: 'Burgundy', hex: '#7c2d12' },
  { id: 'forest', name: 'Forest Green', hex: '#14532d' },
  { id: 'cream', name: 'Cream', hex: '#fef3c7' },
  { id: 'light-gray', name: 'Light Gray', hex: '#d1d5db' },
  { id: 'tan', name: 'Tan', hex: '#d2b48c' },
  { id: 'midnight', name: 'Midnight Blue', hex: '#191970' },
  { id: 'olive', name: 'Olive', hex: '#6b7c3a' },
  { id: 'brown', name: 'Brown', hex: '#8b4513' },
  { id: 'wine', name: 'Wine', hex: '#722f37' },
  { id: 'slate', name: 'Slate', hex: '#475569' },
  { id: 'beige', name: 'Beige', hex: '#f5f5dc' },
];

const materials = [
  { id: 'wool-120s', name: "120's Wool", description: 'Premium wool, perfect drape', season: 'year-round', image: fabricWool },
  { id: 'wool-150s', name: "150's Super Wool", description: 'Luxury super-fine wool', season: 'year-round', image: fabricWool },
  { id: 'linen', name: 'Pure Linen', description: 'Breathable and natural', season: 'spring/summer', image: fabricLinen },
  { id: 'cotton', name: 'Fine Cotton', description: 'Crisp and comfortable', season: 'spring/summer', image: fabricCotton },
  { id: 'silk', name: 'Silk Blend', description: 'Luxurious and smooth', season: 'year-round', image: fabricSilk },
  { id: 'cashmere', name: 'Cashmere Blend', description: 'Ultimate luxury and warmth', season: 'fall/winter', image: fabricCashmere },
  { id: 'velvet', name: 'Velvet', description: 'Rich texture, elegant drape', season: 'fall/winter', image: fabricVelvet },
  { id: 'tweed', name: 'Tweed', description: 'Classic textured wool', season: 'fall/winter', image: fabricTweed },
  { id: 'linen-cotton', name: 'Linen-Cotton Blend', description: 'Best of both worlds', season: 'spring/summer', image: fabricLinen },
  { id: 'wool-silk', name: 'Wool-Silk Blend', description: 'Refined with natural sheen', season: 'year-round', image: fabricWool },
];

const liningDesigns = [
  { id: 'paisley', name: 'Paisley Pattern', description: 'Classic intricate design', image: liningPaisley },
  { id: 'striped', name: 'Striped', description: 'Bold vertical stripes', image: liningStriped },
  { id: 'floral', name: 'Floral', description: 'Elegant flower pattern', image: liningFloral },
  { id: 'solid', name: 'Solid Color', description: 'Timeless simplicity', image: liningSolid },
];

export const StyleSelection = ({ type, selectedStyles, onStyleChange }: StyleSelectionProps) => {
  const [activeSection, setActiveSection] = useState<'style' | 'color' | 'material' | 'lining'>('style');
  const [customLiningPreview, setCustomLiningPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSelection = (category: string, value: any) => {
    onStyleChange({
      ...selectedStyles,
      [category]: value,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomLiningPreview(result);
        updateSelection('lining', { id: 'custom', name: 'Custom Upload', image: result });
        toast.success("Custom lining uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const StyleCard = ({ item, isSelected, onClick }: any) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      {item.image && (
        <div className="aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        {item.season && (
          <Badge variant="secondary" className="mt-2 text-xs">
            {item.season}
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  const ColorCard = ({ color, isSelected, onClick }: any) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
        isSelected ? 'ring-2 ring-primary' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <div 
        className="h-24 w-full"
        style={{ backgroundColor: color.hex }}
      />
      <CardContent className="p-3 text-center">
        <h3 className="font-medium text-sm">{color.name}</h3>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Style</h2>
        <p className="text-lg text-muted-foreground">
          Select the perfect {type} style, color, and material
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex justify-center gap-2 flex-wrap">
        <Button
          variant={activeSection === 'style' ? 'default' : 'outline'}
          onClick={() => setActiveSection('style')}
          className="flex items-center gap-2"
        >
          <Shirt className="h-4 w-4" />
          Style
        </Button>
        <Button
          variant={activeSection === 'color' ? 'default' : 'outline'}
          onClick={() => setActiveSection('color')}
          className="flex items-center gap-2"
        >
          <Palette className="h-4 w-4" />
          Color
        </Button>
        <Button
          variant={activeSection === 'material' ? 'default' : 'outline'}
          onClick={() => setActiveSection('material')}
          className="flex items-center gap-2"
        >
          <Package className="h-4 w-4" />
          Material
        </Button>
        {type === 'suit' && (
          <Button
            variant={activeSection === 'lining' ? 'default' : 'outline'}
            onClick={() => setActiveSection('lining')}
            className="flex items-center gap-2"
          >
            <Layers className="h-4 w-4" />
            Lining
          </Button>
        )}
      </div>

      {/* Style Selection */}
      {activeSection === 'style' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {type === 'suit' ? 'Suit Style' : 'Dress Style'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(type === 'suit' ? suitStyles : dressStyles).map((style) => (
                <StyleCard
                  key={style.id}
                  item={style}
                  isSelected={selectedStyles.style?.id === style.id}
                  onClick={() => updateSelection('style', style)}
                />
              ))}
            </div>
          </div>

          {type === 'suit' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Lapel Style</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {suitLapels.map((lapel) => (
                  <StyleCard
                    key={lapel.id}
                    item={lapel}
                    isSelected={selectedStyles.lapel?.id === lapel.id}
                    onClick={() => updateSelection('lapel', lapel)}
                  />
                ))}
              </div>
            </div>
          )}

          {type === 'dress' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Neckline</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dressNecklines.map((neckline) => (
                  <StyleCard
                    key={neckline.id}
                    item={neckline}
                    isSelected={selectedStyles.neckline?.id === neckline.id}
                    onClick={() => updateSelection('neckline', neckline)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Color Selection */}
      {activeSection === 'color' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Color</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((color) => (
              <ColorCard
                key={color.id}
                color={color}
                isSelected={selectedStyles.color?.id === color.id}
                onClick={() => updateSelection('color', color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Material Selection */}
      {activeSection === 'material' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Material</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material) => (
              <StyleCard
                key={material.id}
                item={material}
                isSelected={selectedStyles.material?.id === material.id}
                onClick={() => updateSelection('material', material)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lining Selection (Suits only) */}
      {activeSection === 'lining' && type === 'suit' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Lining Design</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {liningDesigns.map((lining) => (
                <StyleCard
                  key={lining.id}
                  item={lining}
                  isSelected={selectedStyles.lining?.id === lining.id}
                  onClick={() => updateSelection('lining', lining)}
                />
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Or Upload Your Own Design</h3>
            <Card className="border-dashed">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">Upload custom lining image</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    Choose File
                  </Button>
                  {customLiningPreview && (
                    <div className="mt-4">
                      <img 
                        src={customLiningPreview} 
                        alt="Custom lining preview"
                        className="max-w-xs rounded-lg border-2 border-primary"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {Object.keys(selectedStyles).length > 0 && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Your Selections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
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
              {selectedStyles.lining && (
                <Badge variant="outline">{selectedStyles.lining.name}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};