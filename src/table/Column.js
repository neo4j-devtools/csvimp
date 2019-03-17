import React from 'react'
import styled from 'styled-components'

const StyledRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  min-width: 5em;

  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #f2f2f2;

  :last-child {
    border-right-style: none;
  }

  opacity: ${props => props.isDragging ? 0.7 : 1};
`

// box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;
const StyledHeader = styled.span`
  text-align: center;
  background: white;
  border-color: #f2f2f2;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  padding-top: 0.2em;
  padding-bottom: 0.2em;
`

const StyledItem = styled.span`
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;

  background: white;
  :nth-child(2n) {
    background: #f7f7f7;
  }  

  border-color: #f2f2f2;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  :last-child {
    border-bottom-style: none;
  }

`

const Column = React.forwardRef(({ data, ...props }, ref) =>
  <StyledRoot ref={ref} {...props}>
    {
      data.map((text, i) => i === 0 
        ? <StyledHeader key={`key${i}`}>{text}</StyledHeader>
        : <StyledItem key={`key${i}`} >{text}</StyledItem>
      )
    }
  </StyledRoot>
)

export default Column
