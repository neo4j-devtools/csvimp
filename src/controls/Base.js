import React from 'react'
import styled from 'styled-components'

import LoadButton from './LoadButton'

const StyledDiv = styled.div`
  margin-top: 1em;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
const Base = ({ onLoad }) =>
  <StyledDiv>
    <LoadButton />
  </StyledDiv>

export default Base
