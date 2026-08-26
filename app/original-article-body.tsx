"use client";

import { useEffect, useRef } from "react";

export default function OriginalArticleBody({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function updateExpandAllLabel() {
      const collapseAll = root?.querySelector<HTMLButtonElement>("#collapse-all");
      const nestedLists = Array.from(root?.querySelectorAll<HTMLElement>("#toc ul ul") ?? []);
      if (collapseAll) collapseAll.textContent = nestedLists.some((list) => list.classList.contains("collapsed")) ? "Expand All" : "Collapse All";
    }

    function handleClick(event: Event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("button");
      if (!button || !root?.contains(button)) return;

      if (button.id === "collapse-all") {
        const nestedLists = Array.from(root.querySelectorAll<HTMLElement>("#toc ul ul"));
        const shouldExpand = nestedLists.some((list) => list.classList.contains("collapsed"));
        nestedLists.forEach((list) => list.classList.toggle("collapsed", !shouldExpand));
        updateExpandAllLabel();
        return;
      }

      if (button.classList.contains("toc-toggle")) {
        const targetId = button.dataset.target;
        if (!targetId) return;
        root.querySelector<HTMLElement>(`#${targetId}`)?.classList.toggle("collapsed");
        updateExpandAllLabel();
      }
    }

    root.addEventListener("click", handleClick);
    updateExpandAllLabel();
    return () => root.removeEventListener("click", handleClick);
  }, []);

  return <div className="original-article" ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
