import { apis } from '@/shared/axios';
import React from 'react';
import { useMutation } from 'react-query';

const SignUp = () => {
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
      const data = await apis.post('/register', user);
      console.log('data', data);
      return data;
    },
  });

  return (
    <div>
      회원가입
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
        회원가입
      </button>
    </div>
  );
};
export default SignUp;
