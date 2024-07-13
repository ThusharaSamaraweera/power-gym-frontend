import "./App.css";
import { TooltipProvider } from "./components/ui/tooltip";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <TooltipProvider>
        <Dashboard />
      </TooltipProvider>
    </>
  );
}

export default App;
