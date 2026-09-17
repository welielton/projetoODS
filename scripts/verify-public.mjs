import { chromium } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";

const url =
  process.argv[2] ||
  "https://conecta-voluntario-welielton.yellow-myna-9452.chatgpt.site";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (fs.existsSync("/usr/bin/google-chrome")
      ? "/usr/bin/google-chrome"
      : undefined),
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const result = {
  checkedAt: new Date().toISOString(),
  url,
  authenticated: false,
  checks: [],
};
try {
  const response = await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.getByRole("heading", { name: /Seu talento pode/ }).waitFor();
  result.checks.push({
    resource: "/",
    status: response.status(),
    reactRendered: true,
  });
  await page
    .getByRole("link", { name: "Encontrar vagas", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Oportunidades para fazer a diferença" })
    .waitFor();
  await page.reload();
  await page
    .getByRole("heading", { name: "Oportunidades para fazer a diferença" })
    .waitFor();
  result.checks.push({ resource: "/#/vagas", reload: true });
  for (const [file, signature] of [
    ["apresentacao.pdf", "%PDF"],
    ["apresentacao.pptx", "PK"],
    ["codigo-fonte.zip", "PK"],
  ]) {
    const response = await context.request.get(`${url}/entrega/${file}`);
    const body = await response.body();
    assert.equal(response.status(), 200, file);
    assert.equal(
      body.subarray(0, signature.length).toString(),
      signature,
      file,
    );
    result.checks.push({
      resource: `/entrega/${file}`,
      status: response.status(),
      bytes: body.length,
      signatureValid: true,
    });
  }
  assert.deepEqual(errors, []);
  await page.screenshot({
    path: "docs/evidencias/site-publicado.png",
    fullPage: false,
  });
  result.success = true;
  fs.writeFileSync(
    "docs/evidencias/publicacao-verificada.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
