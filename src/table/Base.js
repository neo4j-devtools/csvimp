import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getFileName,
  setCsvFile,
  getPreview
} from '../state/file'
import LoadButton from './LoadButton'
import Preview from './Preview'

class Base extends Component {
  onLoad = (file) => {
    console.log('loading file', file)
    this.props.setCsvFile(file)
  }

  render() {
    const { csvfile, previewData } = this.props
    if (previewData === null) {
      return <LoadButton onLoad={this.onLoad} />
    } else {
      return <Preview data={previewData} />
    }
  }
}

const mapStateToProps = state => ({
  csvfile: getFileName(state),
  previewData: getPreview(state)
})

const mapDispatchToProps = dispatch => ({
  setCsvFile: file => dispatch(setCsvFile(file))
  //closeModalOverlay: () => dispatch(closeModalOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(Base)
