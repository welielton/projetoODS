import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./styles.css";
import App from "./App";

class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="container py-5">
        <h1>Não foi possível abrir esta tela.</h1>
        <p>Recarregue a página para tentar novamente.</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Recarregar
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
