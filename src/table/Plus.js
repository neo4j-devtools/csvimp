import React from 'react'
import styled from 'styled-components'

const Size = 100

const Base = styled.rect`
  rx: 10;
  ry: 10;
  width: ${Size}px;
  height: ${Size}px;
  stroke: #e48624;
  stroke-width: 5;
  fill: ${props => props.hover ? '#ffae59' : '#e09a50'};
`

const Line = styled.line`
  stroke: #e48624;
  stroke-width: 5;
`

class Plus extends React.Component {
  state = {
    hover: false
  }

  onEnter = () => {
    this.setState({ hover: true })
  }

  onLeave = () => {
    this.setState({ hover: false })
  }

  render () {
    const { from, to, rootWidth, rootHeight, numColumns, onClick } = this.props
    const { hover } = this.state

    const cw = rootWidth / numColumns
    const cx = (from + to)*cw / 2
    const cy = rootHeight / 2

    return (
      <React.Fragment>
        <Base x={cx - Size/2} y={cy - Size/2} hover={hover} onMouseEnter={this.onEnter} onMouseLeave={this.onLeave} onClick={onClick}/>
        <Line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} />
        <Line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} />
      </React.Fragment>
    )
  }
}

export default Plus
