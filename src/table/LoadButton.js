import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const StyledDiv = styled.div`
  
`


const LoadButton = ({ onLoad }) =>
  <Dropzone 
    onDrop={acceptedFiles => onLoad(acceptedFiles[0])}
    multiple={false}
  >
    {({getRootProps, getInputProps}) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </section>
    )}
  </Dropzone>

export default LoadButton
