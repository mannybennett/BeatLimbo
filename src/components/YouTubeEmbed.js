import React from "react";

const YoutubeEmbed = () => (
  <div className="video-responsive">
    <iframe
      style={{ border: 'none', borderRadius: 4 }}
      width="100%"
      height="200px"
      src="https://www.youtube.com/embed/t8zhdv4ruK0"
    />
  </div>
);

export default YoutubeEmbed;