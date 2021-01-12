import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { carouselItems } from "../data";

export default function CarouselList(props) {
  return (
    <Carousel interval={2500} animation="fade">
      {carouselItems.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper style={{ width: 1100 }}>
      <img src={props.item.image} alt="Banner" />
    </Paper>
  );
}
