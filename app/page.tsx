import PylonViewer from "./components/PylonViewer";
import { PylonConfigurationProvider } from "./contexts/PylonConfigurationContext";
import { germanTexts } from "./utils/germanTexts";

export default function Home() {
  return (
    <PylonConfigurationProvider>
      <div
        className="h-screen bg-base-200 flex flex-col"
        data-testid="main-page"
      >
        <div className="flex-shrink-0 p-6 text-center">
          <h1 className="text-3xl font-bold mb-2" data-testid="page-title">
            {germanTexts.pageTitle}
          </h1>
          <p
            className="text-base text-base-content/70"
            data-testid="page-description"
          >
            {germanTexts.pageDescription}
          </p>
        </div>

        <div className="flex-1 px-6 pb-6">
          <PylonViewer />
        </div>
      </div>
    </PylonConfigurationProvider>
  );
}
