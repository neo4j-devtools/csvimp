import React from 'react'
import styled from 'styled-components'
import ATVParallax from './AtvParallax'

const StyledBg = styled.div`
  background-color: #e48624;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`

const Button = ({ onLoad }) =>
  <ATVParallax style={{ width: 320, height: 150 }}>
    <StyledBg />
    <StyledWrapper>
      <span>Load CSV</span>
    </StyledWrapper>
  </ATVParallax>

export default Button
