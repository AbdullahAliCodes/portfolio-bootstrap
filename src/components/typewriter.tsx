"use client";

import { useEffect, useState } from "react";

type Options = { typeMs?: number; deleteMs?: number; holdMs?: number };

/**
 * Cycles through `words` by typing and deleting them (replaces Typed.js).
 * Starts fully typed on the first word so SSR markup is meaningful and stable;
 * under prefers-reduced-motion it stays on the first word.
 */
export function useTypewriter(words: string[], { typeMs = 70, deleteMs = 40, holdMs = 1800 }: Options = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[index];
    let delay: number;
    let step: () => void;

    if (!deleting && text === word) {
      delay = holdMs;
      step = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 300;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? deleteMs : typeMs;
      step = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }

    const t = window.setTimeout(step, delay);
    return () => window.clearTimeout(t);
  }, [words, index, text, deleting, typeMs, deleteMs, holdMs]);

  return text;
}

/** Typed role with a blinking caret. Screen readers get the full list once. */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const text = useTypewriter(words);
  return (
    <span className={className}>
      <span className="sr-only">{words.join(" ")}</span>
      <span aria-hidden>
        {text}
        <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-current animate-caret" />
      </span>
    </span>
  );
}
