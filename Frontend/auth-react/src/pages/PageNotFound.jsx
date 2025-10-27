import React from "react";

export default function PageNotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      color: "#333"
    }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "10px" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Page Not Found</p>
    </div>
  );
}