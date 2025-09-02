"use client";

import PylonViewer from "./components/PylonViewer";
import { PylonConfigurationProvider } from "./contexts/PylonConfigurationContext";
import { useIframeIntegration } from "./hooks/useIframeIntegration";

function HomeContent() {
  // Keep iframe integration for height communication, but no conditional UI
  useIframeIntegration();

  return (
    <div
      className="min-h-screen bg-base-200 p-4 sm:p-6"
      data-testid="main-page"
    >
      <PylonViewer />
    </div>
  );
}

export default function Home() {
  return (
    <PylonConfigurationProvider>
      <HomeContent />
    </PylonConfigurationProvider>
  );
}
