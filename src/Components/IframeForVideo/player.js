import Heading from "./Other Components For Iframe/Heading";
import Description from "./Other Components For Iframe/Description";
import YoutubeEmbed from "./embed";
import './player.css'
import { useLocation } from "react-router-dom";

export default function Player({url}) {
  const location = useLocation();
  const video = location.state.url;
  let desc = video.snippet.description;
  let publishedAt = video.snippet.publishedAt;
  console.log(video);

    return (
      <div className="Player">
        <YoutubeEmbed embedId={video.id.videoId} />
        <Heading Heading={video.snippet.title}></Heading>
        <Description desc={desc} time={publishedAt} id={video.id.videoId}></Description>
      </div>
    );
  }
  