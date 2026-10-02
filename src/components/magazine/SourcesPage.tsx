import { forwardRef } from "react";
import { sources } from "@/data/sources";

const SourcesPage = forwardRef<HTMLDivElement>(function SourcesPage(_props, ref) {
  return (
    <div className="sources" ref={ref}>
      <div className="running-head">References</div>
      <h2>Sources</h2>
      <p className="sources-sub">All figures were accessed on 2 October 2026.</p>
      {sources.map((s) => (
        <div key={s.id} className="source">
          <div className="source-name">{s.name}</div>
          <a
            className="source-url"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.url}
          </a>
          <div className="source-note">{s.note}</div>
        </div>
      ))}
    </div>
  );
});

export default SourcesPage;
