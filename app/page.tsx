import PylonViewer from "./components/PylonViewer";
import { PylonConfigurationProvider } from "./contexts/PylonConfigurationContext";

export default function Home() {
  return (
    <PylonConfigurationProvider>
      <div className="min-h-screen bg-base-200 p-8" data-testid="main-page">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" data-testid="page-title">
              Pylon Configurator POC
            </h1>
            <p
              className="text-lg text-base-content/70"
              data-testid="page-description"
            >
              3D Visualization of Advertising Pylons
            </p>
          </div>

          <div className="flex justify-center">
            <PylonViewer />
          </div>
        </div>
      </div>
    </PylonConfigurationProvider>
  );
}
