"use client";

import { useEffect, useState } from "react";
import Magazine from "./Magazine";

export default function MagazineLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="reader" aria-busy="true" aria-label="Loading magazine">
        <div className="loading-book" />
      </div>
    );
  }

  return <Magazine />;
}
