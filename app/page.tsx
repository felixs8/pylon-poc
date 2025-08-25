import PylonViewer from "./components/PylonViewer";
import { PylonConfigurationProvider } from "./contexts/PylonConfigurationContext";
import { germanTexts } from "./utils/germanTexts";

export default function Home() {
  return (
    <PylonConfigurationProvider>
      <div
        className="min-h-screen bg-base-200 flex flex-col"
        data-testid="main-page"
      >
        {/* Header - responsive padding */}
        <div className="flex-shrink-0 p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="page-title">
            {germanTexts.pageTitle}
          </h1>
          <p
            className="text-sm sm:text-base text-base-content/70"
            data-testid="page-description"
          >
            {germanTexts.pageDescription}
          </p>
        </div>

        {/* Main content - responsive layout */}
        <div className="flex-1 px-4 sm:px-6 pb-4 sm:pb-6">
          <PylonViewer />
        </div>
      </div>
    </PylonConfigurationProvider>
  );
}
