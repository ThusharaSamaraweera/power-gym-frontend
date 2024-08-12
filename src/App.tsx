import "./App.css";
import { TooltipProvider } from "./components/ui/tooltip";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <>
      <TooltipProvider>
        <MainLayout />
      </TooltipProvider>
    </>
  );
}

export default App;
