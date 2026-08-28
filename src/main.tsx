import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/style.css";
import "./styles/react-adapter.css";

createRoot(document.getElementById("root")!).render(<App />);
