
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import FormComp from "./FormComp";

export default function WellnessContactPopup() {
  const [load, setLoad] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setPopupVisible(searchParams.get("showPopup") === "true");
  }, [searchParams]);

  const handleClosePopup = () => {
    setPopupVisible(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("showPopup");

    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (!isPopupVisible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !load) {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isPopupVisible, load, searchParams]);

  if (!isPopupVisible) return null;

  return (
      <section className="wellness-popup-overlay fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
        <div
          className="wellness-popup-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wellness-popup-title"
        >
          <button
            type="button"
            onClick={handleClosePopup}
            disabled={load}
            aria-label="Close contact form"
            className="wellness-popup-close"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className="wellness-popup-content">
            <div className="mb-7 pr-10">
              <span className="wellness-popup-eyebrow mb-3 inline-flex">
                Let’s connect
              </span>

              <h2 id="wellness-popup-title" className="text-subheading">
                Take the first step toward better wellbeing.
              </h2>

              <p className="mt-3 text-body text-text-secondary">
                Have a question or need guidance? Send us a message and our team
                will get back to you soon.
              </p>
            </div>

            <FormComp formName="popupForm" setLoad={setLoad} />

            <button
              type="submit"
              form="popupForm"
              disabled={load}
              className="wellness-popup-submit mt-6"
            >
              {load ? "Sending..." : "Send your message"}
            </button>
          </div>
        </div>
      </section>
  );
}