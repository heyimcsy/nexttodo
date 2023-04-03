import TodoList from '@/features/TodosList';
import { apis } from '@/shared/axios';
import { cookies } from '@/shared/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';

const Todos = () => {
  const router = useRouter();

  const checkToken = async () => {
    const token = cookies.get('token');
    apis.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  console.log('cookies', cookies);
  //가드 토큰 없으면 보내줘
  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      router.push('/signin');
    }
    checkToken();
  }, []);
  return (
    <div>
      <TodoList />
      <button
        onClick={() => {
          cookies.remove('token');
          router.push('/signin');
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Todos;
