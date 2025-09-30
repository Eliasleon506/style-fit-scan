import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  LogOut, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  Facebook,
  Clock,
  Star,
  MessageSquare,
  Scissors
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const profileSchema = z.object({
  business_name: z.string().min(1, 'Business name is required').max(100),
  owner_name: z.string().min(1, 'Owner name is required').max(100),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram_handle: z.string().max(50).optional(),
  facebook_page: z.string().max(100).optional(),
  experience_years: z.number().min(0).max(100).optional(),
  price_range: z.string().max(100).optional()
});

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
  latitude?: number;
  longitude?: number;
  specialties?: string[];
  experience_years?: number;
  description?: string;
  website_url?: string;
  instagram_handle?: string;
  facebook_page?: string;
  working_hours?: any;
  price_range?: string;
  languages?: string[];
}

interface CustomerInquiry {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_type: string;
  message: string;
  preferred_contact: string;
  status: string;
  created_at: string;
}

const TailorDashboard = () => {
  const [profile, setProfile] = useState<TailorProfile | null>(null);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/tailor/auth');
      return;
    }
    
    fetchProfile();
    fetchInquiries();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('tailor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    }
  };

  const fetchInquiries = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('customer_inquiries')
        .select('*')
        .eq('tailor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleSaveProfile = async (formData: FormData) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const profileData = {
        business_name: formData.get('business_name') as string,
        owner_name: formData.get('owner_name') as string,
        phone: formData.get('phone') as string || null,
        email: formData.get('email') as string || null,
        address: formData.get('address') as string || null,
        city: formData.get('city') as string || null,
        description: formData.get('description') as string || null,
        website_url: formData.get('website_url') as string || null,
        instagram_handle: formData.get('instagram_handle') as string || null,
        facebook_page: formData.get('facebook_page') as string || null,
        experience_years: parseInt(formData.get('experience_years') as string) || null,
        price_range: formData.get('price_range') as string || null,
        specialties: (formData.get('specialties') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
        languages: (formData.get('languages') as string)?.split(',').map(s => s.trim()).filter(Boolean) || []
      };

      const validation = profileSchema.safeParse(profileData);
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive"
        });
        return;
      }

      const { error } = profile 
        ? await supabase
            .from('tailor_profiles')
            .update(profileData)
            .eq('user_id', user.id)
        : await supabase
            .from('tailor_profiles')
            .insert({ ...profileData, user_id: user.id });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile saved successfully!"
      });
      
      await fetchProfile();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('customer_inquiries')
        .update({ status })
        .eq('id', inquiryId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Inquiry status updated"
      });
      
      await fetchInquiries();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Tailor Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile?.owner_name || user.email}
            </span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="inquiries">Customer Inquiries ({inquiries.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>
                  Manage your business information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveProfile(formData);
                }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business_name">Business Name *</Label>
                      <Input
                        id="business_name"
                        name="business_name"
                        defaultValue={profile?.business_name || ''}
                        placeholder="Your tailor shop name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="owner_name">Owner Name *</Label>
                      <Input
                        id="owner_name"
                        name="owner_name"
                        defaultValue={profile?.owner_name || ''}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue={profile?.phone || ''}
                        placeholder="+84 123 456 789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={profile?.email || ''}
                        placeholder="contact@yourshop.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={profile?.address || ''}
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={profile?.city || ''}
                      placeholder="Ho Chi Minh City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={profile?.description || ''}
                      placeholder="Describe your services, experience, and what makes your business special..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience_years">Years of Experience</Label>
                      <Input
                        id="experience_years"
                        name="experience_years"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={profile?.experience_years || ''}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price_range">Price Range</Label>
                      <Input
                        id="price_range"
                        name="price_range"
                        defaultValue={profile?.price_range || ''}
                        placeholder="$50-200 per item"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialties">Specialties</Label>
                    <Input
                      id="specialties"
                      name="specialties"
                      defaultValue={profile?.specialties?.join(', ') || ''}
                      placeholder="Wedding dresses, Suits, Casual wear (comma-separated)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages Spoken</Label>
                    <Input
                      id="languages"
                      name="languages"
                      defaultValue={profile?.languages?.join(', ') || ''}
                      placeholder="English, Vietnamese, French (comma-separated)"
                    />
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Media & Website</h3>
                    
                    <div>
                      <Label htmlFor="website_url">Website URL</Label>
                      <Input
                        id="website_url"
                        name="website_url"
                        type="url"
                        defaultValue={profile?.website_url || ''}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="instagram_handle">Instagram Handle</Label>
                        <Input
                          id="instagram_handle"
                          name="instagram_handle"
                          defaultValue={profile?.instagram_handle || ''}
                          placeholder="@yourtailorshop"
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebook_page">Facebook Page</Label>
                        <Input
                          id="facebook_page"
                          name="facebook_page"
                          defaultValue={profile?.facebook_page || ''}
                          placeholder="Your Tailor Shop"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Saving...' : 'Save Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>
                  Manage customer requests and communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {inquiries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No customer inquiries yet</p>
                    <p className="text-sm">When customers contact you, they'll appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <Card key={inquiry.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{inquiry.customer_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(inquiry.created_at).toLocaleDateString()} • 
                                Service: {inquiry.service_type}
                              </p>
                            </div>
                            <Badge variant={
                              inquiry.status === 'pending' ? 'secondary' :
                              inquiry.status === 'responded' ? 'default' : 'outline'
                            }>
                              {inquiry.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-4 w-4" />
                              <span>{inquiry.customer_email}</span>
                            </div>
                            {inquiry.customer_phone && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>{inquiry.customer_phone}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="bg-muted p-4 rounded-md mb-4">
                            <p className="text-sm">{inquiry.message}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            {inquiry.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateInquiryStatus(inquiry.id, 'responded')}
                              >
                                Mark as Responded
                              </Button>
                            )}
                            {inquiry.status === 'responded' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateInquiryStatus(inquiry.id, 'completed')}
                              >
                                Mark as Completed
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{inquiries.length}</p>
                      <p className="text-sm text-muted-foreground">Total Inquiries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {inquiries.filter(i => i.status === 'pending').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Pending Responses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {inquiries.filter(i => i.status === 'completed').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TailorDashboard;