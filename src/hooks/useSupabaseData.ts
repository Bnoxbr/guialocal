import { useState, useEffect } from "react";
import * as supabaseClient from "../lib/supabaseClient";

type FetchFunction<T> = () => Promise<{ data: T | null; error: any }>;

export function useSupabaseData<T>(
  fetchFunction: FetchFunction<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await fetchFunction();

        if (error) {
          throw error;
        }

        setData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
}

export function useGuides() {
  return useSupabaseData(supabaseClient.fetchGuides);
}

export function useGuideById(id: string) {
  return useSupabaseData(() => supabaseClient.fetchGuideById(id), [id]);
}

export function useExperiences() {
  return useSupabaseData(supabaseClient.fetchExperiences);
}

export function useLocations() {
  return useSupabaseData(supabaseClient.fetchLocations);
}

export function useCategories() {
  return useSupabaseData(supabaseClient.fetchCategories);
}

export function useUserBookings(userId: string | undefined) {
  return useSupabaseData(
    () =>
      userId
        ? supabaseClient.fetchUserBookings(userId)
        : Promise.resolve({ data: null, error: null }),
    [userId],
  );
}

export function useUserFavorites(userId: string | undefined) {
  return useSupabaseData(
    () =>
      userId
        ? supabaseClient.fetchUserFavorites(userId)
        : Promise.resolve({ data: null, error: null }),
    [userId],
  );
}
