import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  getHeaders,
  setHeaders
} from '../state/file'

import LoadButton from './LoadButton'
import Checkbox from './Checkbox'
import { showPopup } from '../state/popup'

const StyledRoot = styled.div`
  margin-top: 1em;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledButtonList = styled.div`
  display: flex;
  flex-direction: column;
`

/*
    <AtvImg
      layers={[
        'http://kloc.pm/images/back.png',
        'http://kloc.pm/images/front.png',
      ]}
      staticFallback="http://kloc.pm/images/kloc-icon-flattened.jpg"
      isStatic={false}
      className={'thisIsOptional'}
      style={{ width: 320, height: 190 }}
    />

    */
const Base = ({
  useHeaders,
  setUseHeaders,
  showPopup
}) =>
  <StyledRoot>
    <StyledButtonList>
      <Checkbox 
        value={useHeaders}
        onChange={setUseHeaders}
        label='CSV file has headers'
      />
    </StyledButtonList>
    <LoadButton
      onLoad={showPopup}
    />
  </StyledRoot>

const mapStateToProps = state => ({
  useHeaders: getHeaders(state)
})

const mapDispatchToProps = dispatch => ({
  setUseHeaders: value => dispatch(setHeaders(value)),
  showPopup: () => dispatch(showPopup())
})

export default connect(mapStateToProps, mapDispatchToProps)(Base)
