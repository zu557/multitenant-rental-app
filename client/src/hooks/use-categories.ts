import { useEffect, useState } from "react";
import type { Category } from "@/payload-types";

export function useCategories() {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/categories")
      .then(async (res) => {
        if (!res.ok) return null;
        const json = await res.json();
        return (json.docs ?? json ?? null) as Category[] | null;
      })
      .then((cats) => {
        if (!mounted) return;
        setData(cats);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e as Error);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
