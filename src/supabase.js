import { createClient } from '@supabase/supabase-js';

// Use suas variáveis de ambiente (você as configurou no Vercel?)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Cria uma única instância do Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
