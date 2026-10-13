"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import welloraLogo from "@/public/images/wellora.png";

const NAV_ITEMS = [
  { label: "Home", href: "/", sectionId: null },
  { label: "Services", href: "/#services-section", sectionId: "services-section" },
  { label: "Our Approach", href: "/#journey-section", sectionId: "journey-section" },
  { label: "About", href: "/#about-section", sectionId: "about-section" },
  { label: "Journal", href: "/#journal-section", sectionId: "journal-section" },
] as const;

const NAV_TRANSITION = {
  duration: 0.25,
  ease: "easeOut" as const,
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 4) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 4) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigation = useCallback(
    (sectionId: string | null) => {
      setIsMobileMenuOpen(false);

      if (!sectionId) {
        if (pathname === "/") {
          window.history.replaceState(null, "", "/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push("/");
        }

        return;
      }

      if (pathname !== "/") {
        router.push(`/#${sectionId}`);
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [pathname, router],
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href.split("#")[0] && href.split("#")[0] !== "/";
  };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -110,
        opacity: isVisible ? 1 : 0,
      }}
      transition={NAV_TRANSITION}
      aria-label="Main navigation"
      className="navbar"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div className='navbar-inner'>
        <Link
          href="/"
          aria-label="Wellora home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="navbar-brand"
        >
          <Image
          src={welloraLogo}
          alt="Wellora logo"
          width={120}
          height={120}
          priority
          />
        </Link>

        <div className="navbar-desktop">
          <div className={`navbar-links ${isScrolled ? " is-scrolled" : ""}`} aria-label="Website sections">
            {NAV_ITEMS.map(({ label, href, sectionId }) => (
              <button
                key={label}
                type="button"
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => handleNavigation(sectionId)}
                className={`navbar-link${isActive(href) ? " is-active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <Link
            href="/?showPopup=true"
            className="navbar-contact"
            aria-label="Contact Wellora"
          >
            <span>Contact</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-mobile-menu"
          className="navbar-mobile-toggle"
        >
          {isMobileMenuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="navbar-mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={NAV_TRANSITION}
            className="navbar-mobile-menu"
          >
            {NAV_ITEMS.map(({ label, href, sectionId }) => (
              <button
                key={label}
                type="button"
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => handleNavigation(sectionId)}
                className={`navbar-mobile-link${isActive(href) ? " is-active" : ""}`}
              >
                <span>{label}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ))}

            <Link
              href="/?showPopup=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="navbar-mobile-contact"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}