import React from 'react';
import styled from 'styled-components';

const Flex = ({ children, css }) => {
  return <StyledFlex css={css}>{children}</StyledFlex>;
};

export default Flex;

const StyledFlex = styled.div`
  display: flex;
`;
