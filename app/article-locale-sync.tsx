"use client";

import { useEffect } from "react";

export default function ArticleLocaleSync({ locale }: { locale: "nl" | "en" }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    let frame = 0;

    function updateProgress() {
      frame = 0;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, window.scrollY / scrollRange) : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    }

    function handleScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--scroll-progress");
    };
  }, [locale]);

  return null;
}
