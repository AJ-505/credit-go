"use client";

import * as React from "react";

export type BrandSide = "regular" | "lender";

const BrandSideContext = React.createContext<BrandSide>("regular");

function BrandSideProvider({
  side,
  children,
}: {
  side: BrandSide;
  children: React.ReactNode;
}) {
  return (
    <BrandSideContext.Provider value={side}>
      {children}
    </BrandSideContext.Provider>
  );
}

function useBrandSide() {
  return React.useContext(BrandSideContext);
}

export { BrandSideProvider, useBrandSide };
