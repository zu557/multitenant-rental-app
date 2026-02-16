import { useEffect, useState } from "react";

export function useSession() {
  const [data, setData] = useState<null | Record<string, any>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/users/me", {
      method: "GET",
      credentials: "include", // Important to include cookies)
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) return null;
        const json = await res.json();
        return json.user ?? null;
      })
      .then((user) => {
        if (!mounted) return;
        setData(user);
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
