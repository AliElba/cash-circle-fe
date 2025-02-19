import React from "react";
import "./SlideIndicator.scss";

interface SlideIndicatorProps {
  swiper: any;
  activeIndex: number;
  slideTitles: string[];
  disabledSteps?: number[];
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ swiper, activeIndex, slideTitles, disabledSteps = [] }) => {
  const handleClick = (index: number) => {
    if (swiper && !disabledSteps.includes(index)) {
      swiper.slideTo(index);
    }
  };

  return (
    <div className="slide-indicator">
      <div className="slide-indicator__titles">
        {slideTitles.map((title, index) => (
          <div
            key={index}
            className={`slide-indicator__titles-title ${activeIndex === index ? "active" : ""} ${disabledSteps.includes(index) ? "disabled" : ""}`}
            onClick={() => handleClick(index)}>
            {title}
          </div>
        ))}
      </div>

      <div className="progress-container">
        {slideTitles.map((_, index) => (
          <div
            key={index}
            className={`progress-step ${activeIndex >= index ? "active" : ""} ${disabledSteps.includes(index) ? "disabled" : ""}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideIndicator;
