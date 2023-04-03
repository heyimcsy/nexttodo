import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { apis } from '@/shared/axios';
import { cookies } from '@/shared/cookie';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

const SignIn = () => {
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
      //디코드 활용
      var decoded = jwtDecode(data.data.token);
      console.log('decoded', decoded.id);
      console.log('data', data.data.token);
      cookies.set('token', data.data.token, { path: '/' });
    },
    onSuccess: () => {
      //토큰 정의 및 토큰이 있으면 실행~~
      console.log('dataa');
      const token = cookies.get('token');
      if (token) {
        console.log('onsuccess', decoded);
        alert(`안녕하세요 {decoded.id}님`);
        router.push('/todos');
      }
    },
  });

  //가드
  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      router.push('/todos');
    }
  });

  //쿠키가 있는지 확인
  //쿠키가 있으면 todolist로 보내기
  // useEffect(() => {
  //   const token = cookies.get('token');
  //   console.log(token);
  //   if (token) {
  //     router.push('/todos');
  //   }
  // }, []);

  return (
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
  );
};
export default SignIn;
