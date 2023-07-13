import { useState, useEffect } from "react";

const ChannelName = ({ channelTitle }) => {
  const [channel, setChannel] = useState("");

  // Turnicate channel Name for Suggested Video
  useEffect(() => {
    const truncateText = (text, maxLength) => {
      if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    };

    setChannel(truncateText(channelTitle, 20));
  }, [channelTitle]);

  return (
    <address className="addressForChannelName">
      {channel}
    </address>
  );
};

export default ChannelName;
