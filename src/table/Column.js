import React from 'react'
import styled from 'styled-components'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledItem = styled.span`
`

const Column = ({
  data
}) =>
  <StyledRoot>
    {
      data.map((text, i) => <StyledItem key={`key${i}`}>{text}</StyledItem>)
    }
  </StyledRoot>

export default Column
