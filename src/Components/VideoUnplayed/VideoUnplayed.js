import { useState, useEffect } from 'react'
import './VideoUnplayedStyles.css'
import TimeAgo from '../TimeCalculation/TimeCalculation';
import ChannelName from '../ChannelName/ChannelName';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BounceLoader } from 'react-spinners';

export default function VideoUnplayed({ VideoDetails, num, hasMore }) {
  const [array, setArray] = useState([]);


  function handleScrollToBottom() {
    console.log('Reached bottom');
    handleClick(6);
  }

  //Sending API Request
  function handleClick(n) {
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
  useEffect(() => {
    if (VideoDetails !== null) {
      setArray(VideoDetails);
      if (VideoDetails > 9) {
        const lastSixItems = VideoDetails.slice(-6);
        setArray(array => [...array, ...lastSixItems])
      }
    }
  }, [VideoDetails])

  return (
    <InfiniteScroll
      className='container-fluid col-md-12 py-5 infinityScrollVideoUnplayed'
      dataLength={array.length}
      next={handleScrollToBottom}
      hasMore={hasMore}
      loader={<BounceLoader color="#d63636" className='mx-auto' />}
      endMessage={<p className='text-center'>API quota has been reached for today</p>}
    >

      <div className='row justify-content-between'>

        {array.map((video) => (

          <Link to={`/${video.snippet.title}`}
            state={{ url: video }}
            className='unplayedVideoDiv col-md-4' key={video.id.videoId}>

            <img className='unplayedVideoImage col-md-12' src={video.snippet.thumbnails.medium.url}
            ></img>
            
            <h5 className='my-2'>{truncateText(video.snippet.title, 47)}</h5>
            <ChannelName channelTitle={video.snippet.channelTitle} />
            <TimeAgo dateString={video.snippet.publishedAt} />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  )
}
