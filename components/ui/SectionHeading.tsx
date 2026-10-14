import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, accent, intro, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
          {title} {accent && <span className="text-accent">{accent}</span>}
        </h2>
        {intro && <p className="mt-5 text-base text-muted sm:text-lg">{intro}</p>}
      </Reveal>
    </div>
  );
}
