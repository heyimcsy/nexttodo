import TodoList from '@/features/TodosList';
import { apis } from '@/shared/axios';
import { cookies } from '@/shared/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';

const Todos = () => {
  const router = useRouter();

  const checkToken = async () => {
    const token = cookies.get('refresh_token');
    apis.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // 토큰 삭제 함수
  const deleteTokens = () => {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    deleteTokens();
    router.push('/signin');
  };

  console.log('cookies', cookies);
  //가드 토큰 없으면 보내줘
  useEffect(() => {
    const refresh_token = cookies.get('refresh_token');
    if (!refresh_token) {
      router.push('/signin');
    }
    checkToken();
  }, []);
  return (
    <div>
      <TodoList />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Todos;
