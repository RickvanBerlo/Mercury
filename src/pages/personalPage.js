import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/headers/personalPageHeader';

const CurriculemVitae = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
`
// const rotate = keyframes`
//   from {
//         transform: rotate(0deg);
//     }

//   to {
//         transform: rotate(360deg);
//     }
//   `

export default CurriculemVitae;
