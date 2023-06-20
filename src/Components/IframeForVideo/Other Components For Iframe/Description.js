import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import TimeAgo from "../../TimeCalculation/TimeCalculation";


function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ backgroundColor: 'pink' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

export default function Description({desc , time, id}) {
      // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
        <TimeAgo dateString={time} />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{desc}
          <a href={`https://www.youtube.com/watch?v=${id}`}
           target="_blank"
           className='anchorTagToWatchOnYoutube'>
            Watch On youtube
            </a></Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
