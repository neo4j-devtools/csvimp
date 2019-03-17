import React from 'react'
import styled from 'styled-components'
import Reorder from 'react-reorder'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Column from './Column'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  background: gray;
  opacity: ${props => props.isDragging ? 0.7 : 1};
`

const onDragEnd = reorder => result => {
  if (result.source && result.destination) {
    reorder(
      result.source.index,
      result.destination.index
    )
  }
}

const Preview = ({
  data, order, reorder
}) => {
  const columns = data.reduce(
    (acc, row) => {
      order.forEach((index, i) => acc[i].content.push(row[index]))
      return acc
    },
    data[0].map((_, i) => ({
      id: `item-${i}`,
      content: []
    }))
  )

  return (
    <DragDropContext onDragEnd={onDragEnd(reorder)}>
      <Droppable droppableId='droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <StyledRoot
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <StyledItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    {item.content}
                  </StyledItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledRoot>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Preview
