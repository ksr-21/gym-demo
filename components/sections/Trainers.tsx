import Image from "next/image";
import { Award } from "lucide-react";
import { trainers } from "@/data/site";
import { withBase } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/Icons";

export function Trainers() {
  return (
    <section id="trainers" aria-labelledby="trainers-title" className="section-pad bg-surface/70">
      <div className="container-x">
        <div id="trainers-title">
          <SectionHeading
            eyebrow="Your coaches"
            title="Meet the"
            accent="team"
            intro="Certified, experienced and obsessed with your progress."
          />
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((t, i) => (
            <li key={t.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative h-full overflow-hidden border border-line bg-ink focus-within:border-accent hover:border-accent">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={withBase(t.image)}
                      alt={`${t.name}, ${t.specialisation} trainer`}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-5 pt-16">
                      <h3 className="text-3xl leading-none">{t.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">{t.specialisation}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-bone">{t.experience}</span> experience
                    </p>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 md:group-focus-within:grid-rows-[1fr] md:group-hover:grid-rows-[1fr] max-md:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 text-sm leading-relaxed text-bone/80">{t.bio}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {t.certifications.map((c) => (
                            <li key={c} className="flex items-center gap-1.5 border border-line px-2.5 py-1 text-[11px] text-muted">
                              <Award size={12} className="text-accent" aria-hidden /> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <a
                      href={t.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} on Instagram`}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bone/80 transition-colors hover:text-accent"
                    >
                      <InstagramIcon width={18} height={18} /> Instagram
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
