import { modalities } from "../data";
export default function JobCard({ job, onSelect }) {
  const ods = job.ods.match(/\d+/)?.[0] || "17";
  return (
    <article className="opportunity-card h-100">
      <div className="d-flex justify-content-between gap-2 mb-3">
        <span className="pill">{modalities[job.modality]}</span>
        <span className={`ods-label ods-${ods}`}>ODS {ods}</span>
      </div>
      <h2 className="h5">{job.title}</h2>
      <p className="ngo-name">{job.ngo}</p>
      <p className="job-description">{job.desc}</p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {job.skills.split(",").map((skill, i) => (
          <span className="skill-tag" key={i}>
            {skill.trim()}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <p className="small text-secondary">
          {job.location} · {job.hours}
        </p>
        <button className="btn btn-primary w-100" onClick={() => onSelect(job)}>
          Ver vaga e candidatar-se
        </button>
      </div>
    </article>
  );
}
