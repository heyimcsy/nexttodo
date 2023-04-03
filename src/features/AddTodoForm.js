import Todos from '@/pages/todos';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const AddTodoForm = () => {
  const router = useRouter();
  //한번에 선언?? 하자
  const [todo, setTodo] = useState({
    title: '',
    content: '',
  });

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setTodo((pre) => ({ ...pre, [name]: value }));
  };

  //create!
  const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    mutationFn: async (payload) => {
      const data = axios.post('http://localhost:4000/todos', payload);
      console.log('payload', payload);
    },
    onSuccess: (data) => {
      router.push('/todos');
    },
  });

  //onMutate => mutate가 실행 된 직후
  //좋아요 가 이런거에 쓰임 성공하던 아니던 일단 바뀐다.

  return (
    <div>
      <div>AddTodoForm</div>

      <input
        type="text"
        value={todo.title}
        name="title"
        onChange={changeInputHandler}
      />
      <input
        type="text"
        value={todo.content}
        name="content"
        onChange={changeInputHandler}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          mutate(todo);
        }}
      >
        {isLoading ? '등록중' : ' ✅'}
      </button>
    </div>
  );
};

export default AddTodoForm;
