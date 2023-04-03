import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
// const { default: axios } = require('axios');
// const { useQuery } = require('react-query');

//GET 가져오기
//고유 키 꼭 넣어주기
const TodoList = () => {
  const go = useRouter();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_TODOS'],
    queryFn: async () => {
      const data = await axios.get('http://localhost:4000/todos');
      return data.data;
    },
  });

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
  return (
    <>
      <button
        onClick={() => {
          go.push('/todos/add');
        }}
      >
        ➡️
      </button>
      <ListDiv>
        {data?.map((todo) => (
          <BoxDiv
            key={todo.id}
            onClick={() => {
              go.push(`/todos/${todo.id}`);
            }}
          >
            <h1>{todo.title}</h1>
            <div>{todo.content}</div>
          </BoxDiv>
        ))}
      </ListDiv>
    </>
  );
};

export default TodoList;

const ListDiv = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const BoxDiv = styled.div`
  border: 1px solid hotpink;
  border-radius: 10px;
  width: 30%;
  height: 300px;
  padding: 10px;
`;
