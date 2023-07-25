import React, { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

function Carousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
          },
        ]}
        speed={400}
        easing="linear"
      >
        <div style={{ width: 150, height: 150, background: '#ff80ed' }}>
          slide 0
        </div>
        <div style={{ width: 150, height: 150, background: '#065535' }}>
          slide 1
        </div>
        <div style={{ width: 150, height: 150, background: '#000000' }}>
          slide 2
        </div>
        <div style={{ width: 150, height: 150, background: '#133337' }}>
          slide 3
        </div>
      </ReactSimplyCarousel>
    </div>
  );
}

export default Carousel;