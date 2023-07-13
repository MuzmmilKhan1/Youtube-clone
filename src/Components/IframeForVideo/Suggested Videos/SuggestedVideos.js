import { useEffect, useState } from 'react';
import TimeAgo from '../../TimeCalculation/TimeCalculation';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BounceLoader } from 'react-spinners';

function SuggestedVideos({ videoId }) {

  // To Store Items Got from API
  const [items, setItems] = useState([])

  // Check No of items
  const [results, setResults] = useState(7);

  // Has  more videos TO end Scroller
  const [hasMore,setHasMore] = useState(true);

  // Increase No of items when reached bottom
  function handleScrollToBottom() {
    setResults(results + 5)
  }

  // To get results from API
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let API = process.env.REACT_APP_YOUTUBE_API;
  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=${results}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // console.log(data)
          setHasMore(false)
        }
        else {
         setItems(data.items) 
        }
      })
      .catch(error => {console.log(error)})
  }, [results]);

  //   Truncating Text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  if(items != null){
    return (
      <InfiniteScroll
      className='my-3'
      dataLength={items.length}
      next={handleScrollToBottom}
      hasMore={hasMore}
      loader={<BounceLoader color="#d63636" className='mx-auto' />}
      endMessage="API quota has been reached for today"
      >
      {items.map((item) => (
        <Link to={`/:${item.snippet.title}`}
          state={{ url: item }}
          className='suggestedVideoSingle'
          >
          <img
            className='mx-2 col-md-5 suggestedVideoImage'
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          >
          </img>
          <div className='suggestedVideoTextDiv'>
            <h6>{truncateText(item.snippet.title, 50)}</h6>
            <p>{item.snippet.channelTitle}</p>
            <TimeAgo dateString={item.snippet.publishedAt}></TimeAgo>
          </div>
        </Link>
      ))}
    </InfiniteScroll>
  );
}
}

export default SuggestedVideos;