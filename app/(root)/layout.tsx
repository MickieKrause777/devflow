import React from "react";

import Navbar from "@/components/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};
export default Layout;
