import React from "react";
import NavbarComponents from "../NavbarComponents";
import HeroSectionComponents from "../heroSectionComponents";
import ServiceProfileComponents from "../serviceComponents";
import ProfileHomepageComponents from "../profileComponents";
import FooterComponents from "../footerComponents";

const HomepageComponents = () => {
  return (
    <div>
      <NavbarComponents />
      <HeroSectionComponents />
      <ServiceProfileComponents/>
      <ProfileHomepageComponents />
      {/* <ServiceProfileComponents/> */}
      <FooterComponents/>
    </div>
  );
};

export default HomepageComponents;
