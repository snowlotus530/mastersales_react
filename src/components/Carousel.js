import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

export default function CarouselList(props) {
  var items = [
    {
      image: "img-carousel/acer-1200-140-1200x140.png",
    },
    {
      image: "img-carousel/dell-1200-140-1200x140.png",
    },
    {
      image: "img-carousel/hp-1200-140-1200x140.png",
    },
    {
      image: "img-carousel/lenovo-1200-140-1200x140.png",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <img src={props.item.image} alt="Banner" />
    </Paper>
  );
}
