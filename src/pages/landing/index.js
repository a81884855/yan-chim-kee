import React from "react";
import Location from "./Location";
import Slideshow from "./Slideshow";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet bodyAttributes={{ class: "home" }}>
        <title>Home - Yan Chim Kee</title>
      </Helmet>
      <div id="info">
        <div id="home">
          <Slideshow />
          <Location />
        </div>
      </div>
    </div>
  );
}
