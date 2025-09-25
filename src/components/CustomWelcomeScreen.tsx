import React from "react";
import { useScreenPlugin } from "tinacms";

const CustomWelcomeScreen: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ color: "#ff6b6b" }}>Welcome to My Custom TinaCMS Dashboard!</h1>
      <p>This is your personalized local welcome screen. Add logos, links, or stats here.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => alert("Navigate to Posts")}>View Posts</button>
        <button onClick={() => alert("Create New Content")}>New Content</button>
      </div>
      {/* Embed collection lists or custom UI */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>📝 Recent Posts</li>
        <li>🖼️ Media Library</li>
      </ul>
    </div>
  );
};

export default CustomWelcomeScreen;