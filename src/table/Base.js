import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      return <Preview
        data={previewData}
        order={order}
        reorder={reorder}  
      />
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
