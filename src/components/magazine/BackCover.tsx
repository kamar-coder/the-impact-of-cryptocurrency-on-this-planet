import { forwardRef } from "react";

const BackCover = forwardRef<HTMLDivElement>(function BackCover(_props, ref) {
  return (
    <div className="back-cover" ref={ref}>
      <span className="cover-watermark" aria-hidden="true">
        Ξ
      </span>
      <div className="back-cover-inner">
        <h2 className="cover-title">
          Impact<span className="cover-title-dot" aria-hidden="true">.</span>
        </h2>
        <p className="back-tagline">
          The promise and the price of money without borders.
        </p>
        <div className="cover-rule" aria-hidden="true" />
      </div>
      <div className="cover-foot" style={{ color: "#9db3aa" }}>
        Sources: Cambridge · World Bank · Ethereum.org
      </div>
    </div>
  );
});

export default BackCover;
