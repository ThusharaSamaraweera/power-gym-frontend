import "./App.css";
import { Button } from "./components/ui/button";
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
