import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
// React StrictMode can cause components to render twice during development to help identify potential side effects.
// This is expected behavior and happens only in development mode.
root.render(<App />);
