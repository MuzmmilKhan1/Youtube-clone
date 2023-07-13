import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import TimeAgo from "../../TimeCalculation/TimeCalculation";

export default function Description({ ChannelId, channel, desc, time, id }) {
  const [showMore, setShowMore] = useState('Show More');
  const [num, setNum] = useState(200)
  const [showbtn, setShowbtn] = useState("none")

  // Check where to display Show More Button or not
  useEffect(() => {
    if (desc && desc.length < 201) {
      setShowbtn('block');
    }
  }, [desc]);
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '.';
    }
    return text;
  };
  function showDesc() {
    if (showMore == 'Show More') {
      setNum(desc.length);
      setShowMore('Show Less')
    } else {
      setNum(200);
      setShowMore('Show More')
    }
  }
  return (
    <Accordion defaultActiveKey="0"
      className='accordionDesc'
    >
      <a
        className='aInAccordion'
        href={`https://www.youtube.com/channel/${ChannelId}`}>{channel}</a>
      <TimeAgo dateString={time} />
      <Card
        className='cardInAccordion'
      >
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {truncateText(desc, num)}
            <address
              style={{ display: { showbtn } }}
              onClick={showDesc}
            >{showMore}</address>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
