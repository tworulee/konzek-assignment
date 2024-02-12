import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function CardMain({ country }) {
  const [isRandomColor, setIsRandomColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const toggleBackgroundColor = () => {
   
    if (!isRandomColor) {
      const randomColor = getRandomColor();
      setBackgroundColor(randomColor);
    } else {
      setBackgroundColor("white");
    }
    setIsRandomColor(!isRandomColor);

    
  };

  return (
    <Card style={{ width: "18rem", backgroundColor }}>
      <Card.Body className="d-flex">
        <Card.Title className="mr-3">{country.name}</Card.Title>

        <Form className="ms-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            onClick={toggleBackgroundColor}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CardMain;
