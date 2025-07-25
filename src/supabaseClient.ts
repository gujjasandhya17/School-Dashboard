// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "public-anon-key";
export const supabase = createClient(supabaseUrl, supabaseKey);
