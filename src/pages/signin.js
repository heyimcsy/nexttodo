import axios from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import Cookies from 'universal-cookie';

const SignIn = () => {
  const [user, setUser] = React.useState({
    id: '',
    password: '',
  });
  const changHandler = ({ target }) => {
    const { name, value } = target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await axios.post('http://3.38.191.164/login', user, {
        headers: data,
      });
      console.log('data', data.token);
      return data;
    },
  });

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
