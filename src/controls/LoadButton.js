import React from 'react'
import styled from 'styled-components'
import ParticleEffectButton from 'react-particle-effect-button'

const Duration = 1000

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ hover }) => hover ? '#ffae59' : '#e48624'};
  width: 320px;
  height: 150px;
`

class Button extends React.Component {
  state = {
    animating: false,
    hover: false
  }

  onEnter = () => {
    this.setState({ hover: true })
  }

  onLeave = () => {
    this.setState({ hover: false })
  }

  onClick = () => {
    this.setState({ animating: true })
    setTimeout(this.props.onLoad, Duration)
  }

  render() {
    const { animating, hover } = this.state

    return (
      <ParticleEffectButton
        color='#e48624'
        hidden={animating}
        duration={Duration}
        direction='bottom'
      >
        <StyledWrapper
          onClick={this.onClick}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          hover={hover}
        >
          <span>Load CSV</span>
        </StyledWrapper>
      </ParticleEffectButton>
    )
  }
}

export default Button
