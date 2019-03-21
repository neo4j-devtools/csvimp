import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  getFileName,
  setCsvFile,
  getPreview
} from '../state/file'
import {
  getOrder,
  reorder
} from '../state/editor'

import LoadButton from './LoadButton'
import Preview from './Preview'
import Controls from './Controls'

const MainUi = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

class Base extends Component {
  onLoad = (file) => {
    console.log('loading file', file)
    this.props.setCsvFile(file)
  }

  render() {
    const { csvfile, previewData, order, reorder } = this.props
    if (previewData === null) {
      return <LoadButton onLoad={this.onLoad} />
    } else {
      return (
        <MainUi>
          <Preview
            data={previewData}
            order={order}
            reorder={reorder}  
          />
          <Controls />
        </MainUi>
      )
    }
  }
}

const mapStateToProps = state => ({
  csvfile: getFileName(state),
  previewData: getPreview(state),
  order: getOrder(state)
})

const mapDispatchToProps = dispatch => ({
  setCsvFile: file => dispatch(setCsvFile(file)),
  reorder: (from, to) => dispatch(reorder(from, to))
})

export default connect(mapStateToProps, mapDispatchToProps)(Base)
