import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  getVisible
} from '../state/popup'
import {
  getOrder,
  reorder,
  addNode,
  updateNode,
  getNodes
} from '../state/editor'

const Base = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ContentRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: black;
  opacity: 0.4;
`

const Content = styled.div`
  background: white;
  width: 300px;
  height: 200px;
`

class Popup extends Component {

  render() {
    const { isVisible } = this.props

    return isVisible 
      ? <Base>
          <Overlay />
          <ContentRoot>
            <Content />
          </ContentRoot>
        </Base>
      : null 
  }
}

const mapStateToProps = state => ({
  isVisible: getVisible(state)
})

const mapDispatchToProps = dispatch => ({
  reorder: (from, to) => dispatch(reorder(from, to)),
  addNode: (from, to) => dispatch(addNode(from, to)),
  updateNode: (index, data) => dispatch(updateNode(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
