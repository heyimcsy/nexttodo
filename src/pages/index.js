import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { apis } from '@/shared/axios';
import { useMutation } from 'react-query';
import { cookies } from '@/shared/cookie';

const App = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    id: '',
    password: '',
  });
  const changHandler = (event) => {
    const { name, value } = event.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('/login', user);
      console.log('data', data.data.token);
      cookies.set('token', data.data.token, { path: '/' });
    },
  });
  return (
    <St>
      <div>
        로그인
        <input type="text" name="id" value={user.id} onChange={changHandler} />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={changHandler}
        />
        <button
          onClick={() => {
            register(user);
          }}
        >
          로그인
        </button>
      </div>
      <button
        onClick={() => {
          router.push('/signup');
        }}
      >
        회원가입
      </button>
    </St>
  );
};

export default App;

const St = styled.div`
  width: 400px;
  border: 1px solid red;
`;
