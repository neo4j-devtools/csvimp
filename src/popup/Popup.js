import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProgressBar from 'react-progress-bar-battlenet-style'
import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import prettyBytes from 'pretty-bytes'
import moment from 'moment'

import {
  getVisible,
  hidePopup
} from '../state/popup'
import {
  getOrder,
  getNodes
} from '../state/editor'
import {
  getFileName,
  getInfo as getFileInfo,
  getFile,
  getHeaders
} from '../state/file'
import {
  getConnected,
  getDriver,
  getInfo
} from '../state/connection'
import { startParsing } from './importer'

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

  pointer-events: none;
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

  pointer-events: all;
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
  state = {
    progress: 0,
    running: false
  }

  onStep = ({ data, progress }) => {
    this.setState({ progress: progress * 100 })
  }

  onComplete = () => {
    this.setState({ running: false, progress: 100 })
  }

  onStart = () => {
    const { file, driver, hasHeaders, order, nodes } = this.props
    startParsing(file, driver, hasHeaders, order, nodes, this.onStep, this.onComplete)
    this.setState({ running: true, progress: 0 })
  }

  onClose = () => {
    this.props.hidePopup()
  }

  render() {
    const { isVisible, filename, connected, info, fileInfo } = this.props
    const { progress, running} = this.state

    return isVisible 
      ? <Base>
          <Overlay
            visible={isVisible}
            onClick={!running ? this.onClose : null}
          />
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
                <LoadButton 
                  type='primary'
                  disabled={running || !connected}
                  onPress={this.onStart}
                >
                  Load
                </LoadButton>
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
  fileInfo: getFileInfo(state),
  file: getFile(state),
  hasHeaders: getHeaders(state),

  order: getOrder(state),
  nodes: getNodes(state)
})

const mapDispatchToProps = dispatch => ({
  hidePopup: () => dispatch(hidePopup())
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
