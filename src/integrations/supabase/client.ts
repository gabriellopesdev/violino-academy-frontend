// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://arxbyzrzkltvdhublfpv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyeGJ5enJ6a2x0dmRodWJsZnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Njc1OTAsImV4cCI6MjA2NDE0MzU5MH0.dbFqvdvmxGgMoX-K96zjlAlIQhzXIkGIb7s4zqixdtg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);