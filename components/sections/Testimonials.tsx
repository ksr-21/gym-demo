import { Star } from "lucide-react";
import { siteConfig, testimonials, type Testimonial } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="panel w-[19rem] shrink-0 p-6 sm:w-[22rem]">
      <div className="flex items-center gap-3">
        <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-accent font-display text-xl text-onaccent">
          {t.name[0]}
        </span>
        <figcaption>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted">{t.when}</p>
        </figcaption>
      </div>
      <div className="mt-4 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={16} aria-hidden className={i < t.rating ? "fill-[#fbbc04] text-[#fbbc04]" : "text-line"} />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-bone/85">{t.text}</blockquote>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden py-24 md:py-32">
      <div className="px-5 sm:px-8">
        <div className="container-x" id="reviews-title">
          <SectionHeading
            eyebrow={`${siteConfig.rating.value} ★ rated · ${siteConfig.rating.count} reviews`}
            title="Loved in"
            accent={siteConfig.area}
          />
        </div>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
        <ul className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-auto motion-reduce:px-5">
          {testimonials.map((t) => (
            <li key={t.name} className="pr-5">
              <ReviewCard t={t} />
            </li>
          ))}
          {/* duplicate set for a seamless loop — hidden from assistive tech and reduced-motion users */}
          {testimonials.map((t) => (
            <li key={`dup-${t.name}`} aria-hidden="true" className="pr-5 motion-reduce:hidden">
              <ReviewCard t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
