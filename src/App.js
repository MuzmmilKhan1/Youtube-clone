import { useState, useEffect } from 'react';
import './App.css';
import VideoUnplayed from './Components/VideoUnplayed/VideoUnplayed';
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from './Components/IframeForVideo/player';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuggestedVideos from './Components/IframeForVideo/Suggested Videos/SuggestedVideos';
import Navbar from './Components/Navbar/Navbar';
import SearchedVideos from './Components/SearchedVideos/SearchedVideos';

function App() {

  let [dogImage, setDogImage] = useState(null)
  const [itemNumber, setItemNumber] = useState(9);

  // Has more for Videos Unplayed Component
  const [hasMore, setHasMore] = useState(true);

  
  useEffect(() => {
    let API = process.env.REACT_APP_YOUTUBE_API
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${itemNumber}&key=${API}`)
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data => {
        const items = data.items || [];
        if(data.error){
          setHasMore(false);
        }
        if (dogImage == null) {
          setDogImage(items)
        } else {
          setDogImage(items);
        }
      })
      .catch(e => console.log(e))
  }, [itemNumber])


  const handleMessageFromChild = (n) => {
    setItemNumber(itemNumber + 6)
  };



  return (

    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<VideoUnplayed VideoDetails={dogImage} hasMore={hasMore} num={handleMessageFromChild}></VideoUnplayed>}></Route>
        <Route path='/:id' element={<Player url></Player>}></Route>
        <Route path='/suggest' element={<SuggestedVideos />}></Route>
        <Route path='/searched/:id' element={<SearchedVideos keyword />}></Route>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
