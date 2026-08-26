"use client";

import { useEffect } from "react";

export default function ArticleLocaleSync({ locale }: { locale: "nl" | "en" }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
