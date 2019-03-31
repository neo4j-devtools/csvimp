import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components'

import rootReducer from './state/root'
import previewMiddleware from './state/previewmw'

import Table from './table/Base'
import Controls from './controls/Base'
import Popup from './popup/Popup'

const Logo = `
██████╗███████╗██╗   ██╗██╗███╗   ███╗██████╗ 
██╔════╝██╔════╝██║   ██║██║████╗ ████║██╔══██╗
██║     ███████╗██║   ██║██║██╔████╔██║██████╔╝
██║     ╚════██║╚██╗ ██╔╝██║██║╚██╔╝██║██╔═══╝ 
╚██████╗███████║ ╚████╔╝ ██║██║ ╚═╝ ██║██║     
 ╚═════╝╚══════╝  ╚═══╝  ╚═╝╚═╝     ╚═╝╚═╝     
`

const store = createStore(
  rootReducer,
  compose(applyMiddleware(previewMiddleware))
)

const StyledRoot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #dddddd;
  display: flex;
  flex-direction: column;
  padding: 1em;

  font-family: Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif;
  user-select: none;

  overflow: hidden;
`

const StyledLogo = styled.p`
  font-size: 10pt;
  font-family: "Courier New", Monospace;
  white-space: pre;
  margin: 0;
  margin-bottom: 1em;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyledRoot>
          <StyledLogo>{Logo}</StyledLogo>

          <Table/>

          <Controls/>

          <Popup />

        </StyledRoot>
      </Provider>
    );
  }
}

export default App;
