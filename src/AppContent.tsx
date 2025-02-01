import React from "react";
import { isPlatform } from "@ionic/react";
import MobileTabs from "./app/layout/MobileTabs";
import WebSidebar from "./app/layout/WebSidebar";

const AppContent: React.FC = () => {
  console.log("[AppContent] rendered");
  const isMobile = isPlatform("mobile");

  return isMobile ? <MobileTabs /> : <WebSidebar />;
};

export default AppContent;
