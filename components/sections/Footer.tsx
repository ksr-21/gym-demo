import { siteConfig } from "@/data/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";

const socials = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 pb-10 pt-16 sm:px-8">
      <div className="container-x grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl tracking-[0.18em]">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Premium gym in {siteConfig.area}, {siteConfig.city}. Strength, HIIT, yoga and personal training.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-2xl text-accent">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...siteConfig.nav, { label: "Free trial", href: "#book" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-2xl text-accent">Follow us</h2>
          <ul className="mt-3 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
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
      <p className="container-x mt-14 border-t border-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
