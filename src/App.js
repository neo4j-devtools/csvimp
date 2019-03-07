import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import fontAscii from 'font-ascii';

import rootReducer from './state/root'

import Table from './table/Base'

const logo = `
██████╗███████╗██╗   ██╗██╗███╗   ███╗██████╗ 
██╔════╝██╔════╝██║   ██║██║████╗ ████║██╔══██╗
██║     ███████╗██║   ██║██║██╔████╔██║██████╔╝
██║     ╚════██║╚██╗ ██╔╝██║██║╚██╔╝██║██╔═══╝ 
╚██████╗███████║ ╚████╔╝ ██║██║ ╚═╝ ██║██║     
 ╚═════╝╚══════╝  ╚═══╝  ╚═╝╚═╝     ╚═╝╚═╝     
`

const fonts = [
  'Acrobatic',
  'Alpha',
  'Avatar',
  'Big',
  'BigMoneyne',
  'BigMoneynw',
  'BigMoneyse',
  'BigMoneysw',
  'Blocks',
  'Bulbhead',
  'Cards',
  'Chiseled',
  'Crawford2',
  'Crazy',
  'DancingFont',
  'Diagonal3d',
  'Doh',
  'Doom',
  'EftiWall',
  'Epic',
  'Firefontk',
  'FireFonts',
  'FlowerPower',
  'FunFace',
  'FunFaces',
  'Ghost',
  'Graceful',
  'Graffiti',
  'Impossible',
  'Isometric1',
  'Isometric2',
  'Isometric3',
  'Isometric4',
  'JSBracketLetters',
  'LilDevil',
  'Merlin1',
  'Modular',
  'Ogre',
  'PatorjkCheese',
  'PatorjkHeX',
  'Rectangles',
  'Slant',
  'SlantRelief',
  'Small',
  'SmallIsometric1',
  'SmallSlant',
  'Soft',
  'Standard',
  'StarWars',
  'SubZero',
  'SwampLand',
  'Sweet',
  'Train',
  'Twisted',
  'Varsity',
  'WetLetts'
]
//fonts.map(f => <div><p id={f} >{fontAscii('CSVimp', { typeface: f })}</p><p>TEXT: {f}</p></div>)

const store = createStore(rootReducer)


const StyledRoot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #cdcdcd;
  display: flex;
  flex-direction: column;
  padding: 1em;
`

const StyledLogo = styled.p`
  font-size: 10pt;
  font-family: "Courier New", Monospace;
  white-space: pre;
  margin: 0;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyledRoot>
          <StyledLogo>{logo}</StyledLogo>

          <Table/>

        </StyledRoot>
      </Provider>
    );
  }
}

export default App;
