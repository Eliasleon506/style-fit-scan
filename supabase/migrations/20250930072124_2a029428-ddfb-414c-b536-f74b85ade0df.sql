-- Create tailor profiles table
CREATE TABLE public.tailor_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Vietnam',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  specialties TEXT[],
  experience_years INTEGER,
  description TEXT,
  website_url TEXT,
  instagram_handle TEXT,
  facebook_page TEXT,
  working_hours JSONB,
  price_range TEXT,
  languages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tailor_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for tailor profiles
CREATE POLICY "Tailor profiles are viewable by everyone" 
ON public.tailor_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Tailors can create their own profile" 
ON public.tailor_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Tailors can update their own profile" 
ON public.tailor_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Tailors can delete their own profile" 
ON public.tailor_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tailor_profiles_updated_at
BEFORE UPDATE ON public.tailor_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create customer inquiries table for customer-tailor communication
CREATE TABLE public.customer_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tailor_id UUID NOT NULL REFERENCES public.tailor_profiles(user_id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for inquiries
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for customer inquiries
CREATE POLICY "Inquiries are viewable by the tailor they belong to" 
ON public.customer_inquiries 
FOR SELECT 
USING (tailor_id = auth.uid());

CREATE POLICY "Anyone can create inquiries" 
ON public.customer_inquiries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Tailors can update inquiry status" 
ON public.customer_inquiries 
FOR UPDATE 
USING (tailor_id = auth.uid());