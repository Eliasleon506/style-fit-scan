import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  Facebook, 
  Star,
  Search,
  Scissors,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface TailorProfile {
  id: string;
  user_id: string;
  business_name: string;
  owner_name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  country: string;
  specialties?: string[];
  experience_years?: number;
  description?: string;
  website_url?: string;
  instagram_handle?: string;
  facebook_page?: string;
  price_range?: string;
  languages?: string[];
}

const TailorDirectory = () => {
  const [tailors, setTailors] = useState<TailorProfile[]>([]);
  const [filteredTailors, setFilteredTailors] = useState<TailorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTailors();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTailors(tailors);
    } else {
      const filtered = tailors.filter(tailor => 
        tailor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.specialties?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tailor.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTailors(filtered);
    }
  }, [searchTerm, tailors]);

  const fetchTailors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tailor_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTailors(data || []);
    } catch (error) {
      console.error('Error fetching tailors:', error);
      toast({
        title: "Error",
        description: "Failed to load tailor directory",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Scissors className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading tailors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Find Expert Tailors
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Connect with skilled tailors in Vietnam for your custom clothing needs
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by business name, city, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                {filteredTailors.length} tailors found
              </span>
            </div>
            <Link to="/tailor/auth">
              <Button>
                Join as Tailor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {filteredTailors.length === 0 ? (
          <div className="text-center py-12">
            <Scissors className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No tailors found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to join our tailor network!'}
            </p>
            <Link to="/tailor/auth">
              <Button>
                Become a Partner Tailor
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTailors.map((tailor) => (
              <Card key={tailor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{tailor.business_name}</CardTitle>
                      <CardDescription>by {tailor.owner_name}</CardDescription>
                    </div>
                    {tailor.experience_years && (
                      <Badge variant="secondary">
                        {tailor.experience_years}+ years
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {tailor.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {tailor.description}
                    </p>
                  )}

                  {tailor.specialties && tailor.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tailor.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {tailor.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tailor.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    {tailor.city && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{tailor.city}, {tailor.country}</span>
                      </div>
                    )}
                    
                    {tailor.price_range && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{tailor.price_range}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {tailor.phone && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${tailor.phone}`}>
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </a>
                      </Button>
                    )}
                    
                    {tailor.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${tailor.email}`}>
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </a>
                      </Button>
                    )}
                    
                    {tailor.website_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={tailor.website_url} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>

                  {(tailor.instagram_handle || tailor.facebook_page) && (
                    <div className="flex space-x-2 pt-2">
                      {tailor.instagram_handle && (
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={`https://instagram.com/${tailor.instagram_handle.replace('@', '')}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {tailor.facebook_page && (
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={`https://facebook.com/${tailor.facebook_page}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TailorDirectory;