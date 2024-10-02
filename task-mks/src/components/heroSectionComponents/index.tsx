import React from "react";

const HeroSectionComponents = () => {
  return (
    <div
      style={{
        backgroundImage: `url(https://mksolusi.id/wp-content/uploads/2019/07/software-development-1.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="max-w-full overflow-hidden h-[calc(100vh-90px)]"
    >
      <p className="text-6xl  text-white mt-[150px] font-light mx-[150px]">
        PT Multi Karya Solusi
      </p>
    </div>
  );
};

export default HeroSectionComponents;
