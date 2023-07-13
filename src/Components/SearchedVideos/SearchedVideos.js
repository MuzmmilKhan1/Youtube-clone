import { useEffect, useState } from 'react';
import TimeAgo from '../TimeCalculation/TimeCalculation';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BounceLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import "./SearchedVideos.css"

function SearchedVideos({ keyword }) {
  // Getting the Keyword
  const location = useLocation();
  const video = location.state.keyword;
  const modifiedString = video.replace(/ /g, '+');

  // Store Searched Items
  const [items, setItems] = useState([])
  // No of Items
  const [results, setResults] = useState(7);

  // Has More of Infinity Scroll
  const [hasMore,setHasMore] = useState(true);
  // Increase No of Items when reached bottom
  function handleScrollToBottom() {
    setResults(results + 5)
  }

  let API = process.env.REACT_APP_YOUTUBE_API;
  // Getting Items from API
  useEffect(() => {
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet&type=video&q=${modifiedString}&maxResults=${results}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            // console.log(data)
            setHasMore(false)
          }
          else {
           setItems(data.items) 
          }
          }).catch(error => {
            // Handle the error
            console.log("dont see the errors")
          });
  }, [results, modifiedString]);
  

  // Styling for Youtube Image
  const style = {
    width: "auto",
    // Adding media query..
    '@media (max-width: 425px)': {
      minWidth: "200px"
    },
  };


  if(items != null){

    return (
      
    <InfiniteScroll
      className='py-3 col-md-12 InfinityScrollSearchBar'
      dataLength={items.length}
      next={handleScrollToBottom}
      hasMore={hasMore}
      loader={<BounceLoader color="#d63636" className='mx-auto' />}
      endMessage={<p>API quota has been reached for Today</p>}
    >
      {items.map((item) => (
        <Link to={`/:${item.snippet.title}`}
          state={{ url: item }}
          className='col-md-10 infinityScrollSearchMappedLink'
          key={item.snippet.thumbnails.medium.url}
          >

          <img
            className='mx-2 infinityScrollSearchMappedLinkImage'
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          >
          </img>
          
          <div className='d-flex flex-column searchedVideosText'
            // Flex Direction is Column if The Class didn't work
          >

            <h6>{item.snippet.title}</h6>
            <p>{item.snippet.channelTitle}</p>
            <TimeAgo dateString={item.snippet.publishedAt}></TimeAgo>
            
          </div>
        </Link>
      ))}
    </InfiniteScroll>
  );
}
}

export default SearchedVideos;