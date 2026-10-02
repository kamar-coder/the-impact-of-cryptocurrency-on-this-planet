"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { chapters } from "@/data/magazine";
import CoverPage from "./CoverPage";
import BackCover from "./BackCover";
import ChapterDivider from "./ChapterDivider";
import ArticlePage from "./ArticlePage";
import TableOfContents, { type TocEntry } from "./TableOfContents";
import SourcesPage from "./SourcesPage";
import AboutPage from "./AboutPage";

// Decorative coins floating in the background behind the book.
// Positions are percentages of the viewport; sizes in px.
const BG_COINS = [
  { sym: "₿", x: 4, y: 12, s: 78, delay: 0, dur: 22, color: "#f7931a" },
  { sym: "Ξ", x: 84, y: 6, s: 60, delay: -6, dur: 26, color: "#627eea" },
  { sym: "Ł", x: 12, y: 74, s: 52, delay: -3, dur: 20, color: "#345d9d" },
  { sym: "Ð", x: 88, y: 64, s: 66, delay: -10, dur: 24, color: "#c2a633" },
  { sym: "₳", x: 42, y: 4, s: 46, delay: -8, dur: 28, color: "#0033ad" },
  { sym: "◎", x: 62, y: 90, s: 58, delay: -4, dur: 23, color: "#14f195" },
  { sym: "Ξ", x: 24, y: 90, s: 40, delay: -12, dur: 30, color: "#627eea" },
  { sym: "₿", x: 72, y: 30, s: 44, delay: -2, dur: 21, color: "#f7931a" },
  { sym: "Ł", x: 50, y: 94, s: 38, delay: -14, dur: 27, color: "#345d9d" },
  { sym: "Ð", x: 94, y: 30, s: 42, delay: -9, dur: 25, color: "#c2a633" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function Magazine() {
  // Page map: 0 cover · 1 contents · then per chapter: divider + articles ·
  // then sources, about, back cover.
  const totalPages =
    2 +
    chapters.reduce((acc, ch) => acc + 1 + ch.articles.length, 0) +
    3; // + sources, about, back cover

  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const reduced = usePrefersReducedMotion();

  const flipTo = useCallback(
    (n: number) => {
      const target = Math.max(1, Math.min(n, totalPages - 1));
      bookRef.current?.pageFlip()?.flip(target);
    },
    [totalPages],
  );

  const next = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const prev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Hide the first-run swipe hint as soon as the reader gets any real
  // input (touch, click, key) — or after a few seconds on its own.
  useEffect(() => {
    const dismiss = () => setInteracted(true);
    window.addEventListener("pointerdown", dismiss, { once: true, passive: true });
    window.addEventListener("keydown", dismiss, { once: true });
    const t = window.setTimeout(dismiss, 6000);
    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.clearTimeout(t);
    };
  }, []);

  const pages = useMemo(() => {
    const entries: TocEntry[] = [];
    let i = 2;
    for (const ch of chapters) {
      entries.push({ number: ch.number, title: ch.title, start: i });
      i += 1 + ch.articles.length;
    }
    const list: ReactNode[] = [];
    list.push(<CoverPage key="cover" />);
    list.push(<TableOfContents key="toc" entries={entries} onJump={flipTo} />);
    for (const ch of chapters) {
      list.push(<ChapterDivider key={`divider-${ch.number}`} chapter={ch} />);
      for (const a of ch.articles) {
        list.push(
          <ArticlePage key={`article-${a.id}`} chapter={ch} article={a} />,
        );
      }
    }
    list.push(<SourcesPage key="sources" />);
    list.push(<AboutPage key="about" />);
    list.push(<BackCover key="back-cover" />);
    return list;
  }, [flipTo]);

  return (
    <div className="reader">
      <div className="crypto-bg" aria-hidden="true">
        {BG_COINS.map((c, i) => (
          <span
            key={i}
            className="crypto-coin"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.s,
              height: c.s,
              fontSize: Math.round(c.s * 0.44),
              color: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.dur}s`,
            }}
          >
            {c.sym}
          </span>
        ))}
      </div>

      <div className="book-shell">
        <HTMLFlipBook
          ref={bookRef}
          className="magazine-book"
          style={{}}
          width={500}
          height={760}
          size="stretch"
          minWidth={280}
          maxWidth={960}
          minHeight={400}
          maxHeight={1200}
          maxShadowOpacity={0.6}
          drawShadow
          flippingTime={reduced ? 0 : 800}
          usePortrait
          startZIndex={0}
          autoSize={false}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={40}
          showPageCorners
          disableFlipByClick={false}
          startPage={0}
          onFlip={(e: any) => setPage(e.data)}
        >
          {pages}
        </HTMLFlipBook>
      </div>

      {!interacted && (
        <div className="swipe-hint" role="status">
          <span className="swipe-hint-arrow" aria-hidden="true">
            ⇆
          </span>
          Swipe or tap to turn the page
        </div>
      )}

      <div className="reader-chrome">
        <div
          className="progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalPages}
          aria-valuenow={page + 1}
        >
          <span
            style={{
              width: `${(((page + 1) / totalPages) * 100).toFixed(1)}%`,
            }}
          />
        </div>
        <div className="chrome-controls">
          <button
            className="chrome-btn chrome-btn--contents"
            onClick={() => flipTo(1)}
            aria-label="Go to contents"
          >
            Contents
          </button>
          <button
            className="chrome-btn chrome-btn--prev"
            onClick={prev}
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <span className="chrome-count" aria-live="polite">
            {page + 1} / {totalPages}
          </span>
          <button
            className="chrome-btn chrome-btn--next"
            onClick={next}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
