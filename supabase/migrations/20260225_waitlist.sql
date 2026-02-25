-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (for public signups)
CREATE POLICY "Allow public insert" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view waitlist (for admins)
-- Note: In a real app, you'd want to restrict this to admins only.
-- For now, we'll keep it simple.
CREATE POLICY "Allow authenticated select" ON public.waitlist
    FOR SELECT USING (auth.role() = 'authenticated');
