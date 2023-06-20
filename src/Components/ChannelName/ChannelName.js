import { useState, useEffect } from "react";

const ChannelName = ({ channelTitle }) => {
  const [channel, setChannel] = useState("");

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
    <address
      style={{
        textAlign: "left",
        fontSize: "smaller",
        width: "80%",
        margin: "1px 0px 1px 1px",
      }}
    >
      {channel}
    </address>
  );
};

export default ChannelName;
