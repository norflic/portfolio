import type { CompetenceLevel as CompetenceLevelModel } from "../../Models/Competence";

type CompetenceLevelProps = {
  level: CompetenceLevelModel;
};

export default function CompetenceLevel({ level }: CompetenceLevelProps) {
  const hasProjects = level.projects.length > 0;

  return (
    <div className="grid gap-6 border-t border-[#2a3540] py-5 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col gap-1">
        <span className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wide text-[#5fc9b8]">
          {level.num}
        </span>
        <span className="text-base font-semibold text-[#e9eef2]">{level.title}</span>
      </div>

      <div>
        <ul className="mb-3 flex list-none flex-col gap-1.5">
          {level.ac.map((ac, index) => (
            <li key={`${level.num}-ac-${index}`} className="relative pl-4 text-sm text-[#92a1ac]">
              <span className="absolute left-0 text-[#2a3540]">-</span>
              {ac}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {hasProjects ? (
            level.projects.map((project, index) => (
              <span
                key={`${level.num}-project-${index}`}
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  color: project.isEntreprise ? "#e3a34e" : "#e9eef2",
                  borderColor: project.isEntreprise ? "rgba(227,163,78,0.45)" : "#2a3540",
                  backgroundColor: project.isEntreprise
                    ? "rgba(227,163,78,0.14)"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                {project.name}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-[#2a3540] bg-[rgba(255,255,255,0.02)] px-3 py-1 text-xs font-medium text-[#92a1ac]">
              Niveau vise, non encore mobilise en projet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

