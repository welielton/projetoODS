import { useEffect, useState } from "react";
import { getStates, getCities } from "../services/ibge";

export function useLocations(uf) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 12000);
    let active = true;
    setLoading(
      uf ? "Carregando municípios do IBGE…" : "Carregando estados do IBGE…",
    );
    setError("");
    setCities([]);
    (uf
      ? getCities(uf, { signal: controller.signal })
      : getStates({ signal: controller.signal })
    )
      .then((data) => {
        if (active) {
          if (uf) setCities(data);
          else setStates(data);
        }
      })
      .catch((err) => {
        if (active && (err.name !== "AbortError" || timedOut))
          setError(
            timedOut
              ? "A consulta demorou mais que o esperado. Tente novamente."
              : "Não foi possível consultar o IBGE. Verifique sua conexão e tente novamente.",
          );
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading("");
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [uf, attempt]);
  return {
    states,
    cities,
    loading,
    error,
    retry: () => setAttempt((n) => n + 1),
  };
}
