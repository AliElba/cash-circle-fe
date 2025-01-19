import React from "react";
import { isPlatform } from "@ionic/react";
import MobileTabs from "./_core/layout/MobileTabs";
import WebSidebar from "./_core/layout/WebSidebar";

const AppContent: React.FC = () => {
  console.log("[AppContent] rendered");
  const isMobile = isPlatform("mobile");

  return isMobile ? <MobileTabs /> : <WebSidebar />;
};

export default AppContent;
