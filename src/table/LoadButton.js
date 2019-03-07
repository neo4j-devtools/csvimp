import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const StyledDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  border-color: #e48624;
  border-width: 2px;
  border-style: dashed;
  border-radius: 1em;

  :focus {
    outline: none;
  }

  :active {
    background-color: #e4862430;
  }
  `

const StyledInput = styled.input`
`

const StyledText = styled.span`
  font-family: Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif;
`

const LoadButton = ({ onLoad }) =>
  <Dropzone 
    onDrop={acceptedFiles => onLoad(acceptedFiles[0])}
    multiple={false}
  >
    {({getRootProps, getInputProps}) => (
      <StyledDiv {...getRootProps()}>
        <StyledInput {...getInputProps()} />
        <StyledText>Drop a csv file here, or click to select</StyledText>
      </StyledDiv>
    )}
  </Dropzone>

export default LoadButton
