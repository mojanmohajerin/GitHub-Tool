import React from "react";

import icon from "./social-media.mp4";

const AnimatedIcon = () => {
  return (
    <video width={24} height={24} autoPlay={true} loop={true}>
      <source src={icon} type="video/mp4" />
    </video>
  );
};

export default AnimatedIcon;
