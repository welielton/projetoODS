export const STORAGE_KEY = "conecta_v2";
export const emptyState = (jobs) => ({
  version: 2,
  jobs,
  volunteers: [],
  applications: [],
});

export function loadState(storage, jobs) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { data: emptyState(jobs), warning: "" };
    const data = JSON.parse(raw);
    const valid =
      data.version === 2 &&
      Array.isArray(data.jobs) &&
      Array.isArray(data.volunteers) &&
      Array.isArray(data.applications) &&
      data.jobs.every((j) =>
        [
          "id",
          "title",
          "ngo",
          "desc",
          "skills",
          "status",
          "area",
          "modality",
          "ods",
        ].every((k) => typeof j[k] === "string"),
      ) &&
      data.volunteers.every((v) =>
        ["id", "name", "email", "city", "uf", "area", "skills"].every(
          (k) => typeof v[k] === "string",
        ),
      ) &&
      data.applications.every((a) =>
        [
          "id",
          "jobId",
          "volunteerId",
          "status",
          "date",
          "jobTitle",
          "volunteerName",
        ].every((k) => typeof a[k] === "string"),
      );
    if (!valid) throw new Error("Formato inválido");
    return { data, warning: "" };
  } catch {
    return {
      data: emptyState(jobs),
      warning:
        "Não foi possível recuperar os dados locais. A demonstração foi reiniciada; os novos dados poderão ser salvos neste navegador.",
    };
  }
}

export function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterJobs(
  jobs,
  { search = "", area = "", modality = "" } = {},
) {
  return jobs.filter(
    (job) =>
      job.status === "Ativa" &&
      (!area || job.area === area) &&
      (!modality || job.modality === modality) &&
      normalize(`${job.title} ${job.ngo} ${job.desc} ${job.skills}`).includes(
        normalize(search),
      ),
  );
}

export function reducer(state, action) {
  switch (action.type) {
    case "saveJob":
      return {
        ...state,
        jobs: state.jobs.some((j) => j.id === action.job.id)
          ? state.jobs.map((j) => (j.id === action.job.id ? action.job : j))
          : [...state.jobs, action.job],
      };
    case "deleteJob":
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.id !== action.id),
        applications: state.applications.filter((a) => a.jobId !== action.id),
      };
    case "saveVolunteer": {
      const duplicate = state.volunteers.some(
        (v) => v.email.toLowerCase() === action.volunteer.email.toLowerCase(),
      );
      return duplicate
        ? state
        : { ...state, volunteers: [...state.volunteers, action.volunteer] };
    }
    case "apply": {
      const a = action.application;
      const valid =
        state.jobs.some((j) => j.id === a.jobId && j.status === "Ativa") &&
        state.volunteers.some((v) => v.id === a.volunteerId);
      const duplicate = state.applications.some(
        (item) => item.jobId === a.jobId && item.volunteerId === a.volunteerId,
      );
      return !valid || duplicate
        ? state
        : { ...state, applications: [...state.applications, a] };
    }
    case "status":
      return ["Aprovada", "Recusada", "Pendente"].includes(action.status)
        ? {
            ...state,
            applications: state.applications.map((a) =>
              a.id === action.id ? { ...a, status: action.status } : a,
            ),
          }
        : state;
    case "cancel":
      return {
        ...state,
        applications: state.applications.filter((a) => a.id !== action.id),
      };
    case "deleteVolunteer":
      return {
        ...state,
        volunteers: state.volunteers.filter((v) => v.id !== action.id),
        applications: state.applications.filter(
          (a) => a.volunteerId !== action.id,
        ),
      };
    default:
      return state;
  }
}
