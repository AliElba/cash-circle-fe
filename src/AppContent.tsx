import React from "react";
import { isPlatform } from "@ionic/react";
import MobileTabs from "./app/layout/MobileTabs";

const AppContent: React.FC = () => {
  console.log("[AppContent] rendered");
  const isMobile = isPlatform("mobile");

  // return isPlatform("mobile") ? <MobileTabs /> : <WebSidebar />;
  return <MobileTabs />;
};

export default AppContent;
