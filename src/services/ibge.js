export const IBGE_BASE = "https://servicodados.ibge.gov.br/api/v1/localidades";

export async function getLocations(path, { signal, fetcher = fetch } = {}) {
  const response = await fetcher(`${IBGE_BASE}/${path}`, { signal });
  if (!response.ok)
    throw new Error(
      `O IBGE não respondeu à consulta (HTTP ${response.status}).`,
    );
  const json = await response.json();
  if (
    !Array.isArray(json) ||
    json.some(
      (item) => !Number.isInteger(item.id) || typeof item.nome !== "string",
    )
  ) {
    throw new Error("O IBGE retornou dados em um formato inesperado.");
  }
  return json
    .map(({ id, nome, sigla }) => ({ id, nome, ...(sigla ? { sigla } : {}) }))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

export const getStates = (options) =>
  getLocations("estados?orderBy=nome", options);
export function getCities(uf, options) {
  if (!/^[A-Z]{2}$/.test(uf)) throw new Error("Selecione um estado válido.");
  return getLocations(`estados/${uf}/municipios?orderBy=nome`, options);
}
