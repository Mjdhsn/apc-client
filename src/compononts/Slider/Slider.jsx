import { Carousel } from "@mantine/carousel";
import css from "./Slider.module.scss";

import Carousel1 from "../../assets/carousel1.png";
import Carousel2 from "../../assets/carousel2.png";
import Carousel3 from "../../assets/carousel3.png";

export default function Slider() {
  return (
    <Carousel
      width={"100%"}
      withIndicators
      height={'100%'}
      withControls={false}
      className={css.slider}
    >
      <Carousel.Slide className={css.slide}>
        <img src={Carousel1} alt={"caousel1"} />
      </Carousel.Slide>

      <Carousel.Slide className={css.slide}>
        <img src={Carousel2} alt={"caousel2"} />
      </Carousel.Slide>

      <Carousel.Slide className={css.slide}>
        <img src={Carousel3} alt={"caousel3"} />
      </Carousel.Slide>
    </Carousel>
  );
}
