type CompetenceCodeBadgeProps = {
  code: string;
};

export default function CompetenceCodeBadge({ code }: CompetenceCodeBadgeProps) {
  return (
    <span
      className="rounded-md border px-2 py-1 text-xs font-semibold tracking-wide"
      style={{
        color: "#e3a34e",
        borderColor: "rgba(227,163,78,0.35)",
        backgroundColor: "rgba(227,163,78,0.08)",
      }}
    >
      {code}
    </span>
  );
}

