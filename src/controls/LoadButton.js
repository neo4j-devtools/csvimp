import React from 'react'
import styled from 'styled-components'
import ParticleEffectButton from 'react-particle-effect-button'

const Duration = 400
const ResetDurarion = 150

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
    hidden: false,
    hover: false
  }

  onEnter = () => {
    this.setState({ hover: true })
  }

  onLeave = () => {
    this.setState({ hover: false })
  }

  onClick = () => {
    this.setState({ animating: true, hidden: true })
  }

  onAnimationComplete = () => {
    const { onLoad } = this.props
    const { hidden } = this.state
    this.setState({ animating: false })
    hidden && setTimeout(this.reset, ResetDurarion)
    onLoad && hidden && onLoad()
  }

  reset = () => {
    this.setState({ animating: true, hidden: false })
  }

  render() {
    const { animating, hidden, hover } = this.state
    return (
      <ParticleEffectButton
        color='#e48624'
        hidden={hidden}
        duration={Duration}
        direction='bottom'
        onComplete={this.onAnimationComplete}
        particlesAmountCoefficient={5}
        oscillationCoefficient={40}
        size={2.5}
        speed={10}
      >
        <StyledWrapper
          onClick={!animating ? this.onClick : null}
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
