// import React from 'react';
// import styled from 'styled-components';

// const Prac = () => {
//   const observer = new IntersectionObserver((e) => {
//     e.forEach((LetterDiv) => {
//       LetterDiv.target.styled.opacity = 1;
//     });
//   });
//   console.log('observer', observer);
//   const div = document.querySelectorAll('LetterDiv');
//   observer.observe(div[0]);

//   return (
//     <BodyDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//       <LetterDiv>
//         <h1>충전포트를 usb-c 타입으로 바꿔달라구요?</h1>
//       </LetterDiv>
//     </BodyDiv>
//   );
// };

// export default Prac;

// const BodyDiv = styled.div`
//   background: black;
//   height: 6000px;
// `;
// const LetterDiv = styled.div`
//   margin-top: 1000px;
//   color: azure;
//   text-align: center;
//   opacity: 0;
//   transition: all 2s;
// `;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Prac = () => {
  const letterDivRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'rotate(360deg)';
        } else {
          entry.target.style.opacity = 0;
        }
      });
    });

    letterDivRefs.current.forEach((div) => observer.observe(div));

    return () => {
      letterDivRefs.current.forEach((div) => observer.unobserve(div));
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !letterDivRefs.current.includes(el)) {
      letterDivRefs.current.push(el);
    }
  };

  return (
    <BodyDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">충전포트를 usb-c 타입으로 바꿔달라구했지?</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">왜 안바꾸지</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">그래서 바꿈요</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">새로운 아이폰</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">속았지 실은 이것도 c타입이야</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <Image
          className="dummy"
          src="/image/image1.jpg"
          layout="intrinsic"
          width={570}
          height={381}
        />
      </LetterDiv>
    </BodyDiv>
  );
};

export default Prac;

const BodyDiv = styled.div`
  background: black;
  height: 100%;
  position: relative;
`;
const LetterDiv = styled.div`
  /* margin-top: 1000px; */
  height: 100vh;
  color: azure;
  position: relative;
  text-align: center;
  opacity: 0;
  transition: all 5s;
  display: flex;
  justify-content: center;
  align-items: center;
  .dummy {
    position: absolute;
  }
`;
