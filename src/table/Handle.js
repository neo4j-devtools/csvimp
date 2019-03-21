import React from 'react'
import styled from 'styled-components'

const HandleW = 40
const HandleH = 40

const HandleVis = styled.rect`
  ${props => props.hover ? 'fill: url(#pattern-hover);' : 'fill: url(#pattern);'}
  width: ${HandleW}px;
  height: ${HandleH}px;  
`

class Handle extends React.Component {

  state = {
    hover: false,
    dragging: false,
    dragX: null
  }

  onEnter = () => {
    this.setState({ hover: true })
  }

  onLeave = () => {
    this.setState({ hover: false })
  }

  onDown = evt => {
    evt.target.setPointerCapture(evt.pointerId)
    this.setState({
      dragging: true,
      dragX: this.props.x
    })
  }

  onMove = evt => {
    const { dragging, dragX } = this.state
    const { onDragging } = this.props

    if (dragging) {
      onDragging(dragX + evt.movementX)
      this.setState({
        dragX: dragX + evt.movementX
      })
    }
  }

  onUp = evt => {
    const { dragging } = this.state
    const { onDragged } = this.props

    if (dragging) {
      evt.target.releasePointerCapture(evt.pointerId)
      this.setState({
        dragging: false
      })
      onDragged(this.state.dragX)
    }
  }

  render () {
    const { x, y } = this.props
    const { hover, dragging, dragX } = this.state

    return (
      <HandleVis
        x={dragging ? dragX : x}
        y={y}
        hover={hover}
        onPointerEnter={this.onEnter}
        onPointerLeave={this.onLeave}
        onPointerDown={this.onDown}
        onPointerMove={this.onMove}
        onPointerUp={this.onUp}
      />
    )
  }
}

export default Handle
