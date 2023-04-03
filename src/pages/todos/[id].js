import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';

const Todo = () => {
  const queryClient = useQueryClient();
  //상태 변화
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
  });

  const router = useRouter();
  const { query } = useRouter();
  console.log('query', query);

  const { data } = useQuery({
    queryKey: ['GET_TODO'],
    queryFn: async () => {
      const data = await axios.get(`http://localhost:4000/todos/${query.id}`);
      return data.data;
    },
    //enabled: -> 참일 때 실행시켜준다.
    enabled: Boolean(query.id),
    onSuccess: (data) => {
      setNewTodo(data);
    },
  });

  console.log('newTodo', newTodo);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setNewTodo((pre) => ({ ...pre, [name]: value }));
  };

  //삭제
  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:4000/todos/${id}`);
    },
    onSuccess: () => {
      router.push('/todos');
    },
  });

  //수정
  const { mutate: updateTodo } = useMutation({
    mutationFn: async (payload) => {
      await axios.patch(`http://localhost:4000/todos/${payload.id}`, {
        title: payload.title,
        content: payload.content,
      });
    },
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries(['GET_TODO']);
    },
  });

  const onSubmit = () => {
    dispatch(addPost());
  };

  return (
    <>
      {isEditMode ? (
        <div
          style={{
            border: '1px dotted red',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <input
            type="text"
            value={newTodo.title}
            name="title"
            onChange={changeInputHandler}
          />
          <input
            type="text"
            value={newTodo.content}
            name="content"
            onChange={changeInputHandler}
          />
        </div>
      ) : (
        <div
          style={{
            border: '1px dotted red',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h1> {data?.title}</h1>
          <div> {data?.content}</div>
        </div>
      )}
      <div style={{ marginTop: '40px' }}>
        {isEditMode ? (
          <>
            <button
              onClick={() => {
                console.log(newTodo);
                updateTodo(newTodo);
              }}
            >
              완료
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                deleteTodo(query.id);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                setIsEditMode(!isEditMode); // 읽기 <-> 수정
              }}
            >
              수정
            </button>
          </>
        )}
      </div>

      <button
        style={{ marginTop: '40px' }}
        onClick={() => {
          router.push('/todos');
        }}
      >
        이전으로
      </button>
    </>
  );
};

export default Todo;
