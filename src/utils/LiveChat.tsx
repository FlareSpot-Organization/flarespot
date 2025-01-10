import React, { useEffect } from "react";

const LiveChat: React.FC = () => {
  useEffect(() => {
    // Add Tawk.to Script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/67810fbb49e2fd8dfe059292/1ih82at5q";
    script.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI; the widget appears automatically
};

export default LiveChat;
