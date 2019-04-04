import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  margin-left: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  border-radius: 0.25em;
  align-self: flex-start;

  font-family: Droid Sans Mono,Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;
  background: #ddca9f;
`

const DBInfo = ({ connected, info }) => 
  <Root>
    <span>{`Status: ${connected ? 'ONLINE' : 'OFFLINE'}`}</span>
    { info && [
      <span key='a'>{`Database: ${info.name}`}</span>,
      <span key='b'>{`${info.description}`}</span>
    ]}
  </Root>

export default DBInfo
