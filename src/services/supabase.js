import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qszfxdcuumhdqksasqth.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzemZ4ZGN1dW1oZHFrc2FzcXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1OTQ0NzgsImV4cCI6MjAyMjE3MDQ3OH0.tnL3e3D2VSgptU6Y7Y1gQ9rxMMwg-udt7JJNmcbayoE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
