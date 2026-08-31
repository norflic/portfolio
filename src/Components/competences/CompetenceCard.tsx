import type { Competence } from "../../Models/Competence";
import CompetenceCodeBadge from "./CompetenceCodeBadge";
import CompetenceLevel from "./CompetenceLevel";

type CompetenceCardProps = {
  competence: Competence;
};

export default function CompetenceCard({ competence }: CompetenceCardProps) {
  return (
    <section
      className="rounded-3xl border-2 p-6 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:bg-[#1B3A66] md:p-8"
      style={{
        borderColor: "#74C69D",
        backgroundColor: "#142C52",
      }}
    >
      <div className="mb-2 flex flex-wrap items-baseline gap-3">
        <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e9eef2] md:text-3xl">
          {competence.nom}
        </h2>
        <CompetenceCodeBadge code={competence.code} />
      </div>

      <p className="mb-5 max-w-[72ch] text-sm text-[#92a1ac] md:text-[0.96rem]">{competence.def}</p>

      <div>
        {competence.niveaux.map((level) => (
          <CompetenceLevel key={`${competence.id}-${level.num}`} level={level} />
        ))}
      </div>
    </section>
  );
}

