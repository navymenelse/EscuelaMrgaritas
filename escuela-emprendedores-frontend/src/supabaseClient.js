// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Extraemos las variables de entorno usando el estándar de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializamos el cliente global de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);