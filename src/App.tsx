import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Arrow from "@/components/arrow/Arrow.tsx";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Arrow />
    </BrowserRouter>
  );
}

export default App;
