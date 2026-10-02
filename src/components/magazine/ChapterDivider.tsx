import { forwardRef } from "react";
import type { Chapter } from "@/data/magazine";

const ChapterDivider = forwardRef<HTMLDivElement, { chapter: Chapter }>(
  function ChapterDivider({ chapter }, ref) {
    return (
      <div className="divider" ref={ref}>
        <div className="divider-inner">
          <span className="divider-num">{chapter.number}</span>
          <h1>{chapter.title}</h1>
          <p>{chapter.subtitle}</p>
        </div>
      </div>
    );
  },
);

export default ChapterDivider;
