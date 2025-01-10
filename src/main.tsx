import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./assets/styles/index.css";
import { store } from "./store/index.ts";
import { Toaster } from "@/components/ui/sonner";
import ThemeControlPanel from "./utils/ThemeController.tsx";
import LiveChat from "./utils/LiveChat.tsx";

import ReactGA from "react-ga4";
ReactGA.initialize("G-88290ZGLR2");

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense>
    <Provider store={store}>
      <App />
      <ThemeControlPanel />
      <LiveChat />
      <Toaster />
    </Provider>
  </Suspense>
);
