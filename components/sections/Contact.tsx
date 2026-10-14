import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
const link = "transition-colors hover:text-accent";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-surface/70">
      <div className="container-x">
        <div id="contact-title">
          <SectionHeading eyebrow="Visit us" title="Find your" accent={siteConfig.area} />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <address className="space-y-8 not-italic">
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-accent" aria-hidden />
                <div>
                  <h3 className="text-2xl">Address</h3>
                  <p className="mt-1 text-sm text-muted">{siteConfig.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent ${link} hover:text-bone`}
                  >
                    Get directions →
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-accent" aria-hidden />
                <div className="w-full">
                  <h3 className="text-2xl">Opening hours</h3>
                  <dl className="mt-1 space-y-1 text-sm">
                    {siteConfig.hours.map((h) => (
                      <div key={h.label} className="flex justify-between gap-6 border-b border-line py-1.5">
                        <dt className="text-muted">{h.label}</dt>
                        <dd>{h.display}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-accent" aria-hidden />
                <div>
                  <h3 className="text-2xl">Get in touch</h3>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>
                      <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={link}>
                        {siteConfig.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail size={14} className="text-muted" aria-hidden />
                      <a href={`mailto:${siteConfig.email}`} className={link}>
                        {siteConfig.email}
                      </a>
                    </li>
                  </ul>
                  <ul className="mt-4 flex gap-3">
                    {[
                      { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
                      { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
                      { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
                      { href: siteConfig.social.youtube, label: "YouTube", Icon: YouTubeIcon },
                    ].map(({ href, label, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid h-11 w-11 place-items-center border border-line transition-colors hover:border-accent hover:text-accent"
                        >
                          <Icon width={20} height={20} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </address>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-80 overflow-hidden border border-line lg:h-full lg:min-h-[28rem]">
              <iframe
                title={`Map showing ${siteConfig.name} at ${siteConfig.address}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0 [filter:var(--map-filter)]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
