import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProgressBar from 'react-progress-bar-battlenet-style'
import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import prettyBytes from 'pretty-bytes'
import moment from 'moment'

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
import {
  getFileName,
  getInfo as getFileInfo
} from '../state/file'
import {
  getConnected,
  getDriver,
  getInfo
} from '../state/connection'

import DBInfo from './DBInfo'

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
  opacity: ${props => props.visible ? 0.4 : 0};
  transition: opacity ease-in-out 0.3s;
`

const Stats = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`

const Buttons = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: flex-end;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  background: #dddddd;
  padding: 1em;
  border-radius: 1em;
  min-width: 50%;

  box-shadow: 0 20px 50px 0 rgba(0,0,0,0.50);
`

const Title = styled.span`
  font-weight: bold;
  font-size: 1.5em;
`

const Text = styled.span`
`

const Button = styled(AwesomeButton)`
  --button-primary-color: #e48624 !important;
  --button-primary-color-dark: #a46313 !important;
  --button-primary-color-hover: #ffae59 !important;
  --button-primary-color-active: #ffae59 !important;
`

const LoadButton = styled(Button)`
  margin-left: 1em !important;
`

class Popup extends Component {

  render() {
    const { isVisible, filename, connected, info, fileInfo, progress = 30, running = false } = this.props

    return isVisible 
      ? <Base>
          <Overlay visible={isVisible} />
          <ContentRoot>
            <Content>
              <Title>Load file</Title>

              <Stats>
                <DBInfo connected={connected} info={info} />

                <Text>{`File: ${filename}`}</Text>
                <Text>{`Size: ${prettyBytes(fileInfo.size)}`}</Text>
                <Text>{`Last modified: ${moment(fileInfo.modified).format('MM/DD/YYYY')}`}</Text>
              </Stats>

              <ProgressBar completed={progress} />

              <Buttons>
                <Button disabled={!running || !connected} >Stop</Button>
                <LoadButton disabled={running || !connected} type='primary' >Load</LoadButton>
              </Buttons>
            </Content>
          </ContentRoot>
        </Base>
      : null 
  }
}

const mapStateToProps = state => ({
  isVisible: getVisible(state),
  filename: getFileName(state),
  connected: getConnected(state),
  driver: getDriver(state),
  info: getInfo(state),
  fileInfo: getFileInfo(state)
})

const mapDispatchToProps = dispatch => ({
  reorder: (from, to) => dispatch(reorder(from, to)),
  addNode: (from, to) => dispatch(addNode(from, to)),
  updateNode: (index, data) => dispatch(updateNode(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
