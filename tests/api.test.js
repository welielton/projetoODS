import { test } from "node:test";
import assert from "node:assert/strict";
import { getLocations, getCities } from "../src/services/ibge.js";

test("API valida, simplifica e ordena a resposta JSON", async () => {
  let requested;
  const data = await getLocations("estados", {
    fetcher: async (url) => {
      requested = url;
      return {
        ok: true,
        json: async () => [
          { id: 35, nome: "São Paulo", sigla: "SP", extra: 123 },
          { id: 21, nome: "Maranhão", sigla: "MA" },
        ],
      };
    },
  });
  assert.match(requested, /ibge.gov.br/);
  assert.deepEqual(data, [
    { id: 21, nome: "Maranhão", sigla: "MA" },
    { id: 35, nome: "São Paulo", sigla: "SP" },
  ]);
});
test("API rejeita erro HTTP e JSON fora do contrato", async () => {
  await assert.rejects(
    getLocations("estados", {
      fetcher: async () => ({ ok: false, status: 503 }),
    }),
    /HTTP 503/,
  );
  await assert.rejects(
    getLocations("estados", {
      fetcher: async () => ({ ok: true, json: async () => ({ erro: true }) }),
    }),
    /formato inesperado/,
  );
  await assert.rejects(
    getLocations("estados", {
      fetcher: async () => ({
        ok: true,
        json: async () => [{ id: "21", nome: "MA" }],
      }),
    }),
    /formato inesperado/,
  );
});
test("API propaga falha de rede e impede UF inválida", async () => {
  await assert.rejects(
    getLocations("estados", {
      fetcher: async () => {
        throw Error("offline");
      },
    }),
    /offline/,
  );
  assert.throws(() => getCities("../"), /estado válido/);
});
