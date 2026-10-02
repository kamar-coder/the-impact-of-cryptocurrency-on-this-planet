import { forwardRef } from "react";

const CoverPage = forwardRef<HTMLDivElement>(function CoverPage(_props, ref) {
  return (
    <div className="cover" ref={ref}>
      <span className="cover-watermark" aria-hidden="true">
        ₿
      </span>
      <div className="cover-inner">
        <div className="cover-kicker">The Planet &amp; the Ledger</div>
        <h1 className="cover-title">
          Impact<span className="cover-title-dot" aria-hidden="true">.</span>
        </h1>
        <div className="cover-rule" aria-hidden="true" />
        <p className="cover-deck">
          How cryptocurrency is reshaping energy, money, and the planet.
        </p>
        <div className="cover-coins" aria-hidden="true">
          <span>₿</span>
          <span>Ξ</span>
          <span>Ł</span>
          <span>Ð</span>
          <span>₳</span>
        </div>
        <p className="cover-credit">
          Presented by <span className="cover-credit-name">Qumar Ahmad</span>
        </p>
        <div className="cover-downloads">
          <a
            className="cover-download"
            href="downloads/impact-magazine.pdf"
            download
          >
            <span aria-hidden="true">↓</span> Download PDF
          </a>
          <a
            className="cover-download"
            href="downloads/impact-magazine.zip"
            download
          >
            <span aria-hidden="true">↓</span> Download ZIP
          </a>
        </div>
      </div>
      <div className="cover-foot">A five-chapter magazine · 2026</div>
    </div>
  );
});

export default CoverPage;
