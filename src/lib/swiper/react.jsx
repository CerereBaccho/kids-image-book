import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const SwiperSlide = ({ children }) => (
  <div className="local-swiper-slide">
    {children}
  </div>
);

SwiperSlide.propTypes = {
  children: PropTypes.node,
};

export const Swiper = ({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  initialSlide = 0,
  onSlideChange,
  ...rest
}) => {
  const containerRef = useRef(null);
  const slidesArray = useMemo(() => Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(initialSlide || 0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setActiveIndex(initialSlide || 0);
  }, [initialSlide, slidesArray.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const slideWidth = containerWidth || el.clientWidth || 1;
    const targetLeft = (slideWidth + spaceBetween) * activeIndex;
    el.scrollTo({ left: targetLeft, behavior: 'auto' });
  }, [activeIndex, containerWidth, spaceBetween]);

  useEffect(() => {
    if (typeof onSlideChange === 'function') {
      onSlideChange({ activeIndex });
    }
  }, [activeIndex, onSlideChange]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const slideWidth = containerWidth || el.clientWidth || 1;
    const newIndex = Math.round(el.scrollLeft / (slideWidth + spaceBetween));

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const slideBasis = slidesPerView > 0 ? `${100 / slidesPerView}%` : '100%';

  return (
    <div
      className="local-swiper"
      ref={containerRef}
      onScroll={handleScroll}
      {...rest}
    >
      {slidesArray.map((child, index) => (
        <div
          key={child?.key ?? index}
          className="local-swiper-slide-wrapper"
          style={{
            marginRight: index === slidesArray.length - 1 ? 0 : spaceBetween,
            flexBasis: slideBasis,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

Swiper.propTypes = {
  children: PropTypes.node,
  slidesPerView: PropTypes.number,
  spaceBetween: PropTypes.number,
  initialSlide: PropTypes.number,
  onSlideChange: PropTypes.func,
};

export default Swiper;
