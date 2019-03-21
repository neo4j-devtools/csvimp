import React from 'react'
import styled from 'styled-components'

const Size = 100

const NodeCircle = styled.circle`
  r: ${Size / 2}px;
  stroke: #635342;
  stroke-width: 5;
  fill: #91867a;
`

const Bracket = styled.path`
  fill: #635342;
  opacity: 0.5;
`

class Node extends React.Component {

  state = {
    hover: false    
  }

  onEnter = () => {
    this.setState({ hover: true })
  }

  onLeave = () => {
    this.setState({ hover: false })
  }

  makePath = (x1, y1, x2, y2) => {
    const bx1 = (x1 + x2 - Size) / 2
    const bx2 = (x1 + x2 + Size) / 2
    const midy = (y1 + y2) / 2
    return `
      M${x1} ${y1}
      C${x1} ${midy}, ${bx1} ${midy}, ${bx1} ${y2}
      L${bx2} ${y2}
      C${bx2} ${midy}, ${x2} ${midy}, ${x2} ${y1}
      L${x1} ${y1}
    `
  }

  render () {
    const { from, to, rootWidth, rootHeight, numColumns, onClick } = this.props
    const { hover } = this.state

    const cw = rootWidth / numColumns
    const x = (from + to)*cw / 2
    const y = rootHeight / 2

    return (
      <React.Fragment>
        <Bracket d={this.makePath(from * cw, 0, to * cw, rootHeight / 2)} />
        <NodeCircle cx={x} cy={y} hover={hover} onClick={onClick} />
      </React.Fragment>
    )
  }
}

export default Node
