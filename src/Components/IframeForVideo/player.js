import Heading from "./Other Components For Iframe/Heading";
import Description from "./Other Components For Iframe/Description";
import YoutubeEmbed from "./embed";
import './player.css'
import { useLocation } from "react-router-dom";
import SuggestedVideos from "./Suggested Videos/SuggestedVideos";

export default function Player({ url }) {

  // To get items from clicked app
  const location = useLocation();
  const video = location.state.url;
  // Snippets of video
  let snippet = video.snippet;
  // Description
  let desc = snippet.description;
  // Title
  let title = snippet.channelTitle;
  // Publishing time
  let publishedAt = snippet.publishedAt;
  // Channel Id
  let channelId = snippet.channelId;

  return (
    // Whole div of Video and Suggested Video
    <div
      className="col-md-12 container-fluid playerHeadDiv"
    >
      {/* Video */}
      <div className="Player col-md-7 my-3 mx-2">
        <YoutubeEmbed embedId={video.id.videoId} />
        <Heading Heading={video.snippet.title}></Heading>
        <Description desc={desc} time={publishedAt}
          id={video.id.videoId} channel={title}
          ChannelId={channelId}></Description>
      </div>
      {/* items of Suggested video */}
      <SuggestedVideos
        videoId={video.id.videoId} ></SuggestedVideos>
    </div>
  );
}
