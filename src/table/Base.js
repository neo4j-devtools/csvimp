import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  getFile,
  setCsvFile
} from '../state/app'
import LoadButton from './LoadButton'

class Base extends Component {
  onLoad = (file) => {
    console.log('loading file', file)
  }

  render() {
    const { csvfile } = this.props
    if (csvfile === null) {
      return <LoadButton onLoad={this.onLoad} />
    } else {
      return <p>{csvfile}</p>
    }
  }
}

const mapStateToProps = state => ({
  csvfile: getFile(state)
})

const mapDispatchToProps = dispatch => ({
  setCsvFile: file => dispatch(setCsvFile(file))
  //closeModalOverlay: () => dispatch(closeModalOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(Base)
