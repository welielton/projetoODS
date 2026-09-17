import { test, expect } from "@playwright/test";

test("perfil sem inscrição e detalhes da candidatura persistida", async ({ page }) => {
  await page.goto("/#/candidaturas");
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem("conecta_v2"));
    state.volunteers.push({ id: "ana", name: "Ana Exemplo", email: "ana@example.com", city: "Buriticupu", uf: "MA", area: "educacao", skills: "Matemática, didática", modality: "remoto", hours: "2" });
    localStorage.setItem("conecta_v2", JSON.stringify(state));
  });
  await page.reload();
  await page.getByLabel("Filtrar por voluntário").selectOption("ana");
  await expect(page.getByRole("heading", { name: "Cadastro de Ana Exemplo" })).toBeVisible();
  await expect(page.getByText("Matemática, didática", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Nenhuma candidatura enviada" })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(0);
  await page.getByRole("link", { name: "Explorar vagas" }).click();
  await page.getByRole("button", { name: "Ver vaga e candidatar-se" }).first().click();
  const title = await page.getByRole("dialog").getByRole("heading").textContent();
  const ngo = await page.getByRole("dialog").locator(".ngo-name").textContent();
  await page.getByLabel("Escolha seu cadastro").selectOption("ana");
  await page.getByRole("button", { name: "Confirmar candidatura" }).click();
  await page.getByRole("link", { name: "Acompanhar", exact: true }).click();
  await page.reload();
  await page.getByLabel("Filtrar por voluntário").selectOption("ana");
  await expect(page.locator("article").getByRole("heading", { name: title, exact: true })).toBeVisible();
  await expect(page.locator("article").getByText(ngo, { exact: true })).toBeVisible();
  await expect(page.locator("article").getByText("Pendente", { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 360, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
