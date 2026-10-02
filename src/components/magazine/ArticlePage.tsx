import { forwardRef } from "react";
import type { Article, Chapter } from "@/data/magazine";
import { sourceLabel } from "@/data/sources";

const ArticlePage = forwardRef<
  HTMLDivElement,
  { chapter: Chapter; article: Article }
>(function ArticlePage({ chapter, article }, ref) {
  return (
    <div className="page article" ref={ref}>
      <div className="page-inner">
        <div className="running-head">
          Chapter {chapter.number} · {chapter.title}
        </div>
        <h2>{article.title}</h2>
        {article.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "drop-cap" : undefined}>
            {p}
          </p>
        ))}
        {article.pullQuote && (
          <blockquote className="pullquote">
            <span className="pullquote-mark" aria-hidden="true">
              “
            </span>
            {article.pullQuote}
          </blockquote>
        )}
        {article.stat && (
          <div className="stat">
            <div className="stat-value">{article.stat.value}</div>
            <div className="stat-label">{article.stat.label}</div>
            <div className="stat-source">
              Source: {sourceLabel(article.stat.sourceId)}
            </div>
          </div>
        )}
        <div className="page-foot">
          <span>Impact</span>
          <span>
            {article.id} · Chapter {chapter.number}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ArticlePage;
