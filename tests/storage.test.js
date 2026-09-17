import { test } from "node:test";
import assert from "node:assert/strict";
import {
  emptyState,
  filterJobs,
  loadState,
  reducer,
} from "../src/services/storage.js";
import { initialJobs } from "../src/data.js";

test("filtros combinam área, modalidade e busca sem acentos; vagas encerradas ficam ocultas", () => {
  assert.equal(
    filterJobs(initialJobs, {
      search: "matematica",
      area: "educacao",
      modality: "remoto",
    }).length,
    1,
  );
  assert.equal(
    filterJobs(initialJobs, { search: "matematica", modality: "presencial" })
      .length,
    0,
  );
  assert.equal(
    filterJobs([{ ...initialJobs[0], status: "Encerrada" }]).length,
    0,
  );
});
test("dados corrompidos são recuperados com aviso", () => {
  for (const raw of [
    "{",
    "{}",
    '{"version":2,"jobs":[{}],"volunteers":[],"applications":[]}',
  ]) {
    const result = loadState({ getItem: () => raw }, initialJobs);
    assert.equal(result.data.jobs.length, 6);
    assert.ok(result.warning);
  }
});
test("indisponibilidade do armazenamento não impede inicialização", () => {
  assert.ok(
    loadState(
      {
        getItem: () => {
          throw Error("blocked");
        },
      },
      initialJobs,
    ).warning,
  );
});
test("CRUD mantém relações e bloqueia candidatura duplicada ou em vaga encerrada", () => {
  let state = emptyState(initialJobs);
  state = reducer(state, {
    type: "saveVolunteer",
    volunteer: { id: "v1", email: "demo@example.com" },
  });
  state = reducer(state, {
    type: "saveVolunteer",
    volunteer: { id: "v2", email: "DEMO@example.com" },
  });
  assert.equal(state.volunteers.length, 1);
  const application = {
    id: "a1",
    jobId: "vaga-1",
    volunteerId: "v1",
    status: "Pendente",
  };
  state = reducer(state, { type: "apply", application });
  state = reducer(state, {
    type: "apply",
    application: { ...application, id: "a2" },
  });
  assert.equal(state.applications.length, 1);
  state = reducer(state, { type: "status", id: "a1", status: "Aprovada" });
  assert.equal(state.applications[0].status, "Aprovada");
  state = reducer(state, {
    type: "saveJob",
    job: { ...initialJobs[0], status: "Encerrada" },
  });
  state = reducer(state, { type: "cancel", id: "a1" });
  state = reducer(state, { type: "apply", application });
  assert.equal(state.applications.length, 0);
  state = reducer(state, { type: "deleteJob", id: "vaga-1" });
  assert.equal(state.jobs.length, 5);
});
test("exclusão de voluntário remove as candidaturas relacionadas", () => {
  const state = {
    ...emptyState(initialJobs),
    volunteers: [{ id: "v" }],
    applications: [{ id: "a", volunteerId: "v" }],
  };
  const next = reducer(state, { type: "deleteVolunteer", id: "v" });
  assert.equal(next.volunteers.length, 0);
  assert.equal(next.applications.length, 0);
});
