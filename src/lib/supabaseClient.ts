import { createClient } from "@supabase/supabase-js";

// Fallback values from supabase.ts if environment variables are not available
const FALLBACK_SUPABASE_URL = "https://teaogmkcaouluqsbzvaz.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYW9nbWtjYW91bHVxc2J6dmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjEzNzQsImV4cCI6MjA1NTI5NzM3NH0.mGIhpQVfWVEH_lSApu6e8JKPdhEJW0nZP1rQITgA9IM";

// Try to use environment variables first, fall back to hardcoded values if not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const signUp = async (
  email: string,
  password: string,
  userData: any,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

// Data fetching functions
export const fetchGuides = async () => {
  const { data, error } = await supabase.from("guides").select("*");

  return { data, error };
};

export const fetchGuideById = async (id: string) => {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const fetchExperiences = async () => {
  const { data, error } = await supabase.from("experiences").select("*");

  return { data, error };
};

export const fetchLocations = async () => {
  const { data, error } = await supabase.from("locations").select("*");

  return { data, error };
};

export const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  return { data, error };
};

export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase.from("bookings").insert([bookingData]);

  return { data, error };
};

export const fetchUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guides(*)")
    .eq("user_id", userId);

  return { data, error };
};

export const toggleFavorite = async (userId: string, guideId: string) => {
  // First check if it's already a favorite
  const { data: existingFavorite } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("guide_id", guideId)
    .single();

  if (existingFavorite) {
    // Remove from favorites
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("guide_id", guideId);

    return { data: null, error, action: "removed" };
  } else {
    // Add to favorites
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, guide_id: guideId }]);

    return { data, error, action: "added" };
  }
};

export const fetchUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*, guides(*)")
    .eq("user_id", userId);

  return { data, error };
};
