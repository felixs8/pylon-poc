import PylonViewer from "./components/PylonViewer";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Pylon Configurator POC</h1>
          <p className="text-lg text-base-content/70">
            3D Visualization of Advertising Pylons
          </p>
        </div>

        <div className="flex justify-center">
          <PylonViewer />
        </div>
      </div>
    </div>
  );
}
