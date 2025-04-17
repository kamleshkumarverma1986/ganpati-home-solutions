"use client";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import NoImageWidget from "./NoImageWidget";
import SectionTitle from "./SectionTitle";
import ShowMedia from "./ShowMedia";

export default function CarouselWidget({ imageList = [], autoPlay = true }) {
  return (
    <>
      {!!imageList.length ? (
        <Carousel
          autoPlay={true}
          infiniteLoop
          interval={6000}
          showThumbs={false}
          dynamicHeight={true}
          animationHandler={"fade"}
        >
          {imageList.map((img) => {
            return (
              <div style={{ height: "100%" }} key={img.asset_id}>
                <ShowMedia media={img} />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <>
          <SectionTitle title={"Carousel Banners"} />
          <NoImageWidget />
        </>
      )}
    </>
  );
}
