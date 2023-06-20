import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoUnplayed from './Components/VideoUnplayed/VideoUnplayed';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useScrollDetection } from './Components/ScrollDetection/Scroll';
import Player from './Components/IframeForVideo/player';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import SuggestedVideos from './Components/IframeForVideo/Suggested Videos/SuggestedVideos';

function App() {

  let [dogImage, setDogImage] = useState(null)
  const [itemNumber, setItemNumber] = useState(9);
  const scrollContainerRef = useScrollDetection(handleScrollToBottom);
  // const previousScrollTopRef = useRef(0);


  function handleScrollToBottom(){
    // console.log("User has reached maximum scrollable height");
    setItemNumber(itemNumber + 6)
    console.log(itemNumber);
  }

  let b = 0;

  // 3. Create out useEffect function
useEffect(() => {
  // const scrollContainer = scrollContainerRef.current;
  // previousScrollTopRef.current = scrollContainer.scrollTop;

  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${itemNumber}&key=AIzaSyBhIcIPGOxQAfasXjVj1cUCnKZjhLAE-po`)
  .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
  .then(data =>{
    const items = data.items || [];
    if(dogImage == null){
      setDogImage(items)
      b=1;
    }else{
      setDogImage(dogImage => [...dogImage, items]);
      console.log(data.items)
    }
    // scrollContainer.scrollTop = previousScrollTopRef.current;
  })
},[itemNumber])


const handleMessageFromChild = (n) => {
  setItemNumber(itemNumber + 6)
  console.log(itemNumber);
};



  return (
    // <div className="App"
    // //  ref={scrollContainerRef} 
    //  style={{
    //   overflowY: "scroll",
    //   maxHeight: "150vh",
    //   border: "1px solid #ccc",
    // }}>
      <Router>
        <Routes>
          <Route path='/' element={<VideoUnplayed VideoDetails={dogImage} num={handleMessageFromChild}></VideoUnplayed>}></Route>
          <Route path='/:id' element={<Player url></Player>}></Route>
          <Route path='/suggest' element={<SuggestedVideos/>}></Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
