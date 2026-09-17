import { test, expect } from "@playwright/test";
import fs from "node:fs";

test("capturas desktop e consulta real à API do IBGE", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/");
  await page.screenshot({
    path: "docs/evidencias/inicio-desktop.png",
    fullPage: false,
  });
  await page.goto("/#/vagas");
  await page.screenshot({
    path: "docs/evidencias/vagas-desktop.png",
    fullPage: false,
  });
  await page.goto("/#/gestao");
  await page.screenshot({
    path: "docs/evidencias/gestao-desktop.png",
    fullPage: false,
  });
  const responses = [];
  page.on("response", async (response) => {
    if (response.url().includes("servicodados.ibge.gov.br") && response.ok()) {
      try {
        const json = await response.json();
        responses.push({
          url: response.url(),
          status: response.status(),
          total: json.length,
          amostra: json.slice(0, 2),
        });
      } catch {
        /* Request cancelled by React StrictMode is not evidence. */
      }
    }
  });
  await page.goto("/#/cadastro");
  await expect(page.getByLabel("Estado (IBGE)")).toBeEnabled({
    timeout: 20000,
  });
  await page.getByLabel("Nome completo").fill("Ana Exemplo");
  await page.getByLabel("E-mail", { exact: true }).fill("ana@example.com");
  await page.getByLabel("Estado (IBGE)").selectOption("MA");
  await expect(page.getByLabel("Município (IBGE)")).toBeEnabled({
    timeout: 20000,
  });
  await page.getByLabel("Município (IBGE)").selectOption("Buriticupu");
  await page.screenshot({
    path: "docs/evidencias/cadastro-api-real.png",
    fullPage: false,
  });
  expect(responses.some((r) => r.url.includes("/municipios"))).toBe(true);
  fs.writeFileSync(
    "docs/evidencias/api-real.json",
    JSON.stringify(
      { capturadoEm: new Date().toISOString(), respostas: responses },
      null,
      2,
    ),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "docs/evidencias/cadastro-mobile.png",
    fullPage: false,
  });
  await page.goto("/");
  await page.screenshot({
    path: "docs/evidencias/inicio-mobile.png",
    fullPage: false,
  });
});

test("evidência da organização dos componentes e código real", async ({
  page,
}) => {
  const files = [
    "src/App.jsx",
    "src/context/AppContext.jsx",
    "src/services/ibge.js",
  ];
  const code = files.map((file) => ({
    name: file,
    content: fs.readFileSync(file, "utf8"),
  }));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.setContent(
    '<html lang="pt-BR"><head><meta charset="utf-8"><style>body{margin:0;background:#142b25;color:#e4eee7;font:18px system-ui;padding:40px}h1{font-size:32px}main{display:grid;grid-template-columns:300px 1fr;gap:32px}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.35 monospace;background:#203b32;padding:24px;border-radius:12px}h2{font-size:20px;color:#b9d7a9}</style></head><body><h1>Conecta Voluntário · organização React</h1><main><aside><h2>Arquitetura</h2><pre id="tree"></pre></aside><section><h2 id="filename"></h2><pre id="source"></pre></section></main></body></html>',
  );
  await page
    .locator("#tree")
    .evaluate(
      (el) =>
        (el.textContent =
          "src/\n├── App.jsx\n├── main.jsx\n├── components/\n│   ├── Layout.jsx\n│   ├── JobCard.jsx\n│   └── Modal.jsx\n├── context/\n│   └── AppContext.jsx\n├── hooks/\n│   └── useLocations.js\n├── pages/\n│   ├── Home.jsx\n│   ├── Jobs.jsx\n│   ├── Register.jsx\n│   ├── Management.jsx\n│   └── …\n└── services/\n    ├── ibge.js\n    └── storage.js"),
    );
  for (const [i, file] of code.entries()) {
    await page
      .locator("#filename")
      .evaluate((el, name) => (el.textContent = name), file.name);
    await page
      .locator("#source")
      .evaluate((el, content) => (el.textContent = content), file.content);
    await page.screenshot({
      path: `docs/evidencias/codigo-${i}.png`,
      fullPage: false,
    });
  }
});
