import React from 'react'
import styled from 'styled-components'
import Switch from 'rc-switch'
import 'rc-switch/assets/index.css'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
`

const StyledLabel = styled.span`
  margin-left: 1em;
`

const CheckBox = ({ label, value, onChange }) =>
  <StyledRoot onClick={() => onChange(!value)} >
    <Switch
      onChange={onChange}
      checked={value}
      checkedChildren='On'
      unCheckedChildren='Off'
    />
    <StyledLabel>{label}</StyledLabel>
  </StyledRoot>

export default CheckBox
