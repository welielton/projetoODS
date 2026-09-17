import { test, expect } from "@playwright/test";

async function mockIbge(page) {
  await page.route("https://servicodados.ibge.gov.br/**", (route) =>
    route.fulfill({
      json: route.request().url().includes("/municipios")
        ? [
            { id: 2102325, nome: "Buriticupu" },
            { id: 2111300, nome: "São Luís" },
          ]
        : [
            { id: 21, nome: "Maranhão", sigla: "MA" },
            { id: 35, nome: "São Paulo", sigla: "SP" },
          ],
    }),
  );
}
async function register(page) {
  await page.goto("/#/cadastro");
  await page.getByLabel("Nome completo").fill("Ana Exemplo");
  await page.getByLabel("E-mail", { exact: true }).fill("ana@example.com");
  await page.getByLabel("Estado (IBGE)").selectOption("MA");
  await page.getByLabel("Município (IBGE)").selectOption("Buriticupu");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page
    .getByLabel("Área de atuação", { exact: true })
    .selectOption("educacao");
  await page.getByLabel("Suas habilidades").fill("Matemática, didática");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Entendo que os dados").check();
  await page.getByRole("button", { name: "Concluir cadastro" }).click();
  await expect(
    page.getByRole("heading", { name: "Seu talento já faz parte da rede." }),
  ).toBeVisible();
}

test("cadastro, candidatura, duplicidade, aprovação e persistência", async ({
  page,
}) => {
  await mockIbge(page);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await register(page);
  await page
    .getByRole("link", { name: "Encontrar oportunidades", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ver vaga e candidatar-se" })
    .first()
    .click();
  await page
    .getByLabel("Escolha seu cadastro")
    .selectOption({ label: "Ana Exemplo" });
  await page
    .getByRole("button", { name: "Confirmar candidatura", exact: true })
    .click();
  await expect(page.getByRole("status").first()).toContainText("enviada");
  await page
    .getByRole("button", { name: "Ver vaga e candidatar-se" })
    .first()
    .click();
  await page
    .getByLabel("Escolha seu cadastro")
    .selectOption({ label: "Ana Exemplo" });
  await expect(
    page.getByRole("button", { name: "Confirmar candidatura", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await page.goto("/#/gestao");
  await page.getByRole("button", { name: "Solicitações", exact: true }).click();
  await page.getByRole("button", { name: "Aprovar candidatura" }).click();
  await page.goto("/#/candidaturas");
  await expect(page.getByText("Aprovada", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Aprovada", { exact: true })).toBeVisible();
  await page.screenshot({
    path: "docs/evidencias/candidatura-aprovada.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("busca sem acentos, combinação de filtros e estado vazio", async ({
  page,
}) => {
  await page.goto("/#/vagas");
  await page.getByLabel("Buscar oportunidades").fill("matematica");
  await expect(page.locator("article")).toHaveCount(1);
  await page
    .getByLabel("Modalidade", { exact: true })
    .selectOption("presencial");
  await expect(
    page.getByRole("heading", { name: "Nenhuma oportunidade encontrada" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver todas as vagas" }).click();
  await expect(page.locator("article")).toHaveCount(6);
});

test("CRUD de vagas, encerramento e exclusão confirmada", async ({ page }) => {
  await page.goto("/#/gestao");
  await page.getByRole("button", { name: "Nova vaga" }).click();
  for (const [label, value] of [
    ["Título da vaga", "Oficina de robótica"],
    ["Instituição", "ONG Exemplo"],
    ["Habilidades (separadas por vírgulas)", "Robótica, programação"],
    ["Descrição", "Ensinar conceitos de robótica para estudantes."],
  ])
    await page.getByLabel(label, { exact: true }).fill(value);
  await page.getByRole("button", { name: "Salvar vaga" }).click();
  await expect(
    page.getByRole("cell", { name: "Oficina de robótica ONG Exemplo" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Editar Oficina de robótica" })
    .click();
  await page.getByLabel("Status", { exact: true }).selectOption("Encerrada");
  await page.getByRole("button", { name: "Salvar vaga" }).click();
  await page.goto("/#/vagas");
  await expect(
    page.getByRole("heading", { name: "Oficina de robótica" }),
  ).toHaveCount(0);
  await page.goto("/#/gestao");
  await page
    .getByRole("button", { name: "Excluir Oficina de robótica" })
    .click();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Excluir Oficina de robótica" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Excluir Oficina de robótica" })
    .click();
  await page
    .getByRole("button", { name: "Confirmar exclusão", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Excluir Oficina de robótica" }),
  ).toHaveCount(0);
});

test("API indisponível informa o problema e permite repetir a consulta", async ({
  page,
}) => {
  await page.route("https://servicodados.ibge.gov.br/**", (route) =>
    route.fulfill({ status: 503, body: "offline" }),
  );
  await page.goto("/#/cadastro");
  await expect(page.getByRole("alert")).toContainText(
    "Não foi possível consultar o IBGE",
  );
  await page.screenshot({
    path: "docs/evidencias/api-erro.png",
    fullPage: true,
  });
  await page.unroute("https://servicodados.ibge.gov.br/**");
  await mockIbge(page);
  await page.getByRole("button", { name: "Tentar novamente" }).click();
  await expect(page.getByLabel("Estado (IBGE)")).toBeEnabled();
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("dados locais corrompidos não quebram a aplicação", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("conecta_v2", "{broken"));
  await page.goto("/#/vagas");
  await expect(page.getByRole("alert")).toContainText(
    "Não foi possível recuperar",
  );
  await expect(page.locator("article")).toHaveCount(6);
});

test("navegação SPA, teclado, menu móvel e ausência de overflow", async ({
  page,
}) => {
  await mockIbge(page);
  await page.goto("/");
  await page.evaluate(() => (window.__spaMarker = "preserved"));
  await page
    .getByRole("link", { name: "Encontrar vagas", exact: true })
    .click();
  expect(await page.evaluate(() => window.__spaMarker)).toBe("preserved");
  const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#\/vagas$/);
  await expect(page.locator("#main-content")).toBeFocused();
  await page
    .getByRole("button", { name: "Ver vaga e candidatar-se" })
    .first()
    .click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/vagas",
      "/cadastro",
      "/gestao",
      "/sobre",
      "/talentos",
      "/instituicao",
      "/candidaturas",
    ]) {
      await page.goto(`/#${route}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      if (
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )
      ) {
        console.log(
          await page.evaluate(() =>
            [...document.querySelectorAll("body *")]
              .filter((el) => el.getBoundingClientRect().right > innerWidth)
              .map((el) => ({
                tag: el.tagName,
                class: el.className,
                right: el.getBoundingClientRect().right,
              }))
              .slice(0, 15),
          ),
        );
        await page.screenshot({
          path: "docs/evidencias/diagnostico-mobile.png",
          fullPage: true,
        });
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} em ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("link", { name: "Encontrar vagas", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Abrir menu" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.screenshot({
    path: "docs/evidencias/vagas-mobile.png",
    fullPage: true,
  });
});
