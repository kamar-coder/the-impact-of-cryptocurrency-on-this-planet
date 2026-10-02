import { forwardRef } from "react";

export type TocEntry = {
  number: string;
  title: string;
  start: number;
};

const TableOfContents = forwardRef<
  HTMLDivElement,
  { entries: TocEntry[]; onJump: (pageIndex: number) => void }
>(function TableOfContents({ entries, onJump }, ref) {
  return (
    <div className="toc" ref={ref}>
      <div className="running-head">Contents</div>
      <h2>What’s inside</h2>
      <p className="toc-sub">Five chapters, from the basics to the future.</p>
      {entries.map((e) => (
        <button
          key={e.number}
          className="toc-item"
          onClick={() => onJump(e.start)}
        >
          <span className="toc-num">{e.number}</span>
          <span className="toc-title">{e.title}</span>
          <span className="toc-page">p. {e.start + 1}</span>
        </button>
      ))}
      <p className="toc-how">
        Tap a chapter to jump to it. Turn pages by swiping, tapping the page
        edges, or using the buttons below.
      </p>
    </div>
  );
});

export default TableOfContents;
