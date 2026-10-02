import { forwardRef } from "react";

const AboutPage = forwardRef<HTMLDivElement>(function AboutPage(_props, ref) {
  return (
    <div className="about" ref={ref}>
      <div className="page-inner">
        <div className="running-head">Editor’s note</div>
        <h2>About this magazine</h2>
        <p>
          Impact is a five-chapter digital magazine about what cryptocurrency is
          doing to the planet — to its energy grids, its financial systems, and
          its people.
        </p>
        <p>
          We aim for balance: the promise and the price, in the same spread. Every
          figure is approximate and attributed on the Sources page; nothing here
          is investment advice.
        </p>
        <p>Turn back to the cover and read it again.</p>
        <div className="page-foot">
          <span>Impact</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
});

export default AboutPage;
