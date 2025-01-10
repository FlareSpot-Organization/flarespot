import React, { useEffect } from "react";

const LiveChat: React.FC = () => {
  useEffect(() => {
    // Add Tawk.to Script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_UNIQUE_ID/default"; // Replace YOUR_UNIQUE_ID with your Tawk.to ID
    script.charset = "UTF-8";
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
