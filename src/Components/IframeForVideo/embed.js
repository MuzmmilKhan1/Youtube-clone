import {useState} from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive px-2">
    <iframe
  width="853"
  height="480"
  src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  title="Embedded youtube"
/>
</div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
