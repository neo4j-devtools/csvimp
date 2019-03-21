import React from 'react'
import styled from 'styled-components'

const Margin = 80
const HeadSize = 25

const Line = styled.line`
  stroke: #e48624;
  stroke-width: 10;
`

class Relationship extends React.Component {
  render () {
    const { from, to, rootWidth, rootHeight, numColumns } = this.props

    const cw = rootWidth / numColumns
    const start = from * cw + Margin
    const stop = to * cw - Margin
    const cy = rootHeight / 2

    return (
      <React.Fragment>
        <Line x1={start} y1={cy} x2={stop} y2={cy} />
        <Line x1={stop - HeadSize - 3} y1={cy - HeadSize} x2={stop - 3} y2={cy} />
        <Line x1={stop - HeadSize - 3} y1={cy + HeadSize} x2={stop - 3} y2={cy} />
      </React.Fragment>
    )
  }
}

export default Relationship
