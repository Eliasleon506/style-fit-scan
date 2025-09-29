import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Shirt, Package } from "lucide-react";

interface StyleSelectionProps {
  type: 'suit' | 'dress';
  selectedStyles: any;
  onStyleChange: (styles: any) => void;
}

const suitStyles = [
  { id: 'two-piece', name: 'Two-Piece', description: 'Classic jacket and trousers' },
  { id: 'three-piece', name: 'Three-Piece', description: 'Jacket, waistcoat, and trousers' },
  { id: 'dinner-jacket', name: 'Dinner Jacket', description: 'Formal evening wear' },
];

const suitLapels = [
  { id: 'notched', name: 'Notched Lapel', description: 'Traditional business style' },
  { id: 'peaked', name: 'Peaked Lapel', description: 'Formal and elegant' },
  { id: 'shawl', name: 'Shawl Lapel', description: 'Smooth curved design' },
];

const dressStyles = [
  { id: 'a-line', name: 'A-Line', description: 'Classic fitted bodice, flared skirt' },
  { id: 'sheath', name: 'Sheath', description: 'Sleek and fitted silhouette' },
  { id: 'mermaid', name: 'Mermaid', description: 'Fitted through hips, flared bottom' },
  { id: 'ball-gown', name: 'Ball Gown', description: 'Full skirt, fitted bodice' },
];

const dressNecklines = [
  { id: 'scoop', name: 'Scoop Neck', description: 'Classic rounded neckline' },
  { id: 'v-neck', name: 'V-Neck', description: 'Elegant V-shaped neckline' },
  { id: 'off-shoulder', name: 'Off-Shoulder', description: 'Romantic off-shoulder style' },
  { id: 'high-neck', name: 'High Neck', description: 'Modern high neckline' },
];

const colors = [
  { id: 'navy', name: 'Navy Blue', hex: '#1e3a8a' },
  { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'burgundy', name: 'Burgundy', hex: '#7c2d12' },
  { id: 'forest', name: 'Forest Green', hex: '#14532d' },
  { id: 'cream', name: 'Cream', hex: '#fef3c7' },
];

const materials = [
  { id: 'wool-120s', name: "120's Wool", description: 'Premium wool, perfect drape', season: 'year-round' },
  { id: 'wool-150s', name: "150's Wool", description: 'Luxury super-fine wool', season: 'year-round' },
  { id: 'linen', name: 'Pure Linen', description: 'Breathable and natural', season: 'spring/summer' },
  { id: 'cotton', name: 'Fine Cotton', description: 'Crisp and comfortable', season: 'spring/summer' },
  { id: 'silk', name: 'Silk Blend', description: 'Luxurious and smooth', season: 'year-round' },
  { id: 'cashmere', name: 'Cashmere Blend', description: 'Ultimate luxury and warmth', season: 'fall/winter' },
];

export const StyleSelection = ({ type, selectedStyles, onStyleChange }: StyleSelectionProps) => {
  const [activeSection, setActiveSection] = useState<'style' | 'color' | 'material'>('style');

  const updateSelection = (category: string, value: any) => {
    onStyleChange({
      ...selectedStyles,
      [category]: value,
    });
  };

  const StyleCard = ({ item, isSelected, onClick }: any) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
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
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div 
          className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-border"
          style={{ backgroundColor: color.hex }}
        />
        <h3 className="font-medium text-sm">{color.name}</h3>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Style</h2>
        <p className="text-lg text-muted-foreground">
          Select the perfect {type} style, color, and material
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex justify-center gap-2">
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
              <div className="grid md:grid-cols-3 gap-4">
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
              <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};