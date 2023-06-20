import {useState,useEffect,useRef, useCallback} from 'react'
import './VideoUnplayedStyles.css'
import TimeAgo from '../TimeCalculation/TimeCalculation';
import ChannelName from '../ChannelName/ChannelName';
import { Link } from 'react-router-dom';
import { useScrollDetection } from '../ScrollDetection/Scroll';

export default function VideoUnplayed({VideoDetails, num}) {
  const [array, setArray] = useState([]);

  // Console Log When Reach the bottom
  const scrollContainerRef = useScrollDetection(handleScrollToBottom);
  
  function handleScrollToBottom() {
    console.log('Reached bottom');
    handleClick(6);
  }

  //Sending API Request
  const handleClick = (n) => {
    num(n)
  };


  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };


  // Check If VideoDetails is Empty
  useEffect(()=>{
    const scrollContainer = scrollContainerRef.current;

    if (VideoDetails && VideoDetails.length > 0){
      setArray(VideoDetails)
    } 
  }) 


  return (
    <div className='container col-md-12'
    ref={scrollContainerRef}
    style={{
      overflowY: 'scroll',
      maxHeight: '100vh',
      minWidth: '100%',
      padding: 0,
      margin: 0,
    }}
    >
      <div className='row justify-content-between'
            ref={scrollContainerRef}>

    {array.map((video) => (
      <Link to={`/:${video.snippet?.title}`} 
      state={{url: video}}
       className='unplayedVideoDiv col-md-3' key={video.id.videoId}>
        <img className='unplayedVideoImage' src={video.snippet.thumbnails.medium.url}
        ></img>
        <h5>{truncateText(video.snippet.title, 47)}</h5>
        <ChannelName channelTitle={video.snippet.channelTitle}/>
        <TimeAgo dateString={video.snippet.publishedAt} />
      </Link>
    ))}
      </div>
    </div> 
  )
}
