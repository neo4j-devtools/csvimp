import React from 'react'
import styled from 'styled-components'
import  getResizeDetector from 'element-resize-detector'

import Plus from './Plus'
import Node from './Node'

const Root = styled.div`
  flex: 1;
`

const SvgRoot = styled.svg`
  position: absolute;
`

const numColumns = 6

class Controls extends React.Component {

  state = {
    rootElement: null,
    loaded: false,
    nodes: []
  }

  onRootElement = element => {
    const { rootElement } = this.state
    const detector = getResizeDetector()

    if (rootElement && rootElement !== element) {
      detector.removeAllListeners(rootElement)
    }

    if (element) {
      detector.listenTo(element, e => {
        this.setState({
          loaded: true,
          width: e.offsetWidth,
          height: e.offsetHeight
        })
      })
      this.setState({ rootElement: element })
    }
  }

  addNode = (from, to) => () => {
    const { nodes } = this.state
    let newNodes = nodes.slice()
    for (let i = 0; i <= nodes.length; i++) {
      const start = i === 0 ? 0 : nodes[i - 1].to
      const end = i === nodes.length ? numColumns : nodes[i].from
      if (from >= start && to <= end) {
        newNodes.splice(i, 0, { from, to })
      }
    }

    this.setState({
      nodes: newNodes
    })
  }

  onNodeUpdate = (data, nodeIndex) => {
    this.setState({
      nodes: this.state.nodes.map((n, i) => i === nodeIndex
        ? { ...n, ...data }
        : n
      )
    })
  }

  render() {
    const { loaded, width, height, nodes } = this.state
    let content = []

    if (loaded) {
      console.log('RENDER')
      let prevLast = 0
      nodes.forEach((n, i) => {
        console.log(prevLast, n.from, n.to)
        if (n.from > prevLast) {
          content.push(
            <Plus
              onClick={this.addNode(prevLast, n.from)}
              from={prevLast}
              to={n.from}
              rootWidth={width}
              rootHeight={height}
              numColumns={numColumns}
              key={`plus-${i}`}
            />
          )
        }

        content.push(
          <Node
            from={n.from}
            to={n.to}
            rootWidth={width}
            rootHeight={height}
            numColumns={numColumns}
            key={`node-${i}`}
            onUpdate={data => this.onNodeUpdate(data, i)}
          />
        )

        prevLast = n.to
      })

      let lastPos = nodes.length === 0 ? 0 : nodes[nodes.length - 1].to
      if (lastPos < numColumns) {
        content.push(
          <Plus
            onClick={this.addNode(lastPos, numColumns)}
            from={lastPos}
            to={numColumns}
            rootWidth={width}
            rootHeight={height}
            numColumns={numColumns}
            key='plus-last'
          />
        )
      }
    }

    return <Root ref={this.onRootElement}>
      <SvgRoot width={width} height={height}>
        {content}
      </SvgRoot>
    </Root>
  }
}

export default Controls
