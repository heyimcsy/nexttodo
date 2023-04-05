import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  const router = useRouter();
  return (
    <div>
      <div> 환영합니다 낯선 곳에 오신 자여</div>;
      <button
        onClick={() => {
          router.push('/signin');
        }}
      >
        이동하기
      </button>
    </div>
  );
};

export default App;

const St = styled.div`
  width: 400px;
  border: 1px solid red;
`;
