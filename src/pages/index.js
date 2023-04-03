import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const App = (props) => {
  const router = useRouter();
  console.log(props);
  return (
    <St>
      <div>index</div>
      <button
        onClick={() => {
          router.push('/signin');
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          router.push('/signup');
        }}
      >
        로그인
      </button>
    </St>
  );
};

export default App;

const St = styled.div`
  width: 400px;
  border: 1px solid red;
`;
