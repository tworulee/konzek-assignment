import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function CardMain({ country, id }) {
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    const storedColor = localStorage.getItem(`cardColor-${id}`);
    if (storedColor) {
      setBackgroundColor(storedColor);
    }
  }, [id]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const toggleBackgroundColor = () => {
    if (backgroundColor === "white") {
      const newColor = getRandomColor();
      setBackgroundColor(newColor);

      localStorage.setItem(`cardColor-${id}`, newColor);
    } else {
      setBackgroundColor("white");

      localStorage.setItem(`cardColor-${id}`, "white");
    }
  };

  return (
    <Card
      style={{ width: "18rem", backgroundColor }}
      id={`custom-switch-${id}`}
      onClick={toggleBackgroundColor}
    >
      <Card.Body className="d-flex">
        <Card.Title className="mr-3">{country.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardMain;
