import Image from "next/image";
import Link from "next/link";
import linkedin from "@/public/images/footer/linkedin.svg";
import whatsApp from "@/public/images/footer/whatsapp.svg";
import instagram from "@/public/images/footer/instagram.svg";
import facebook from "@/public/images/footer/facebook.svg";
import email from "@/public/images/footer/email.svg";

const FOOTER_LINKS = [
    { label: "Home", href: "#home-section" },
    { label: "Wellness", href: "#wellness-areas-section" },
    { label: "Services", href: "#services-section" },
    { label: "Stories", href: "#testimonials-section" },
    { label: "Contact", href: "#contact-section" },
];

const SOCIAL_LINKS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        icon: instagram,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: facebook,
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/",
        icon: whatsApp,
    },
    {
        label: "Email",
        href: "mailto:hello@example.com",
        icon: email,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: linkedin,
    },
];

export default function Footer() {
  return (
    <footer className="wellness-footer w-full px-[3%] pb-6 pt-12 sm:pt-16 lg:pt-20">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr] lg:items-start lg:gap-12">
        <div className="flex flex-col items-start">
          <Link
            href="#home-section"
            aria-label="Wellora home"
            className="text-subheading font-bold uppercase tracking-[0.12em] text-primary transition-default hover:opacity-80"
          >
            Wellora
          </Link>

          <p className="text-body mt-4 max-w-sm text-secondary">
            A more mindful approach to everyday wellbeing. Make space for
            healthier habits, balance, and feeling your best.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 lg:justify-center"
        >
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-small text-secondary transition-default hover-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start lg:items-end">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-muted">
            Stay connected
          </p>

          <div className="mt-4 grid w-full max-w-xs grid-cols-5 gap-2 lg:max-w-sm">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="wellness-footer-social flex aspect-square items-center justify-center rounded-xl border-default transition-default hover-primary"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-muted">
          © {new Date().getFullYear()} Wellora. All rights reserved.
        </p>

        <p className="text-caption text-muted">
          Your wellbeing, one step at a time.
        </p>
      </div>
    </footer>
  );
}

