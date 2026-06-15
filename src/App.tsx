/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import SaaSApp from "./components/SaaSApp";

export default function App() {
  return (
    <div
      className="min-h-screen text-[#1E293B] selection:bg-[#2563EB]/20 selection:text-[#1E293B] flex flex-col"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      id="master-app-root"
    >
      <SaaSApp />
    </div>
  );
}
