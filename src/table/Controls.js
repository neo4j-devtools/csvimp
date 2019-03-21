import React, { Component } from 'react'
import styled from 'styled-components'
import  getResizeDetector from 'element-resize-detector'

const Root = styled.div`
  background: red;
  flex: 1;
`

const numColumns = 6

class Controls extends React.Component {

  state = {
    rootElement: null,
    loaded: false
  }

  onRootElement = element => {
    const { rootElement } = this.state
    const detector = getResizeDetector()

    if (rootElement && rootElement !== element) {
      detector.removeAllListeners(rootElement)
    }

    if (element) {
      detector.listenTo(element, () => {
        this.setState({
          loaded: true,
          width: element.offsetWidth,
          height: element.offsetHeight
        })
      })
      this.setState({ rootElement: element })
    }
  }

  render() {
    return <Root ref={this.onRootElement}>
      
    
    
    </Root>
  }
}

export default Controls
