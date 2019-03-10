import React from 'react'
import styled from 'styled-components'
import Reorder from 'react-reorder'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Column from './Column'

const StyledRoot = styled.div`
  margin-top: 1em;
  background-color: red;
  width: 100px;
  height; 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledButtonList = styled.div`
  display: flex;
  flex-direction: column;
`

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(6),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


const Preview = ({
  data
}) => {
  const columns = data.reduce(
    (acc, row) => {
      row.forEach((item, i) => acc[i].push(item))
      return acc
    },
    data[0].map(_ => [])
  )

  console.log(columns, columns[0])
//  return <Column data={columns[0]} />

  const list = [
    {name: 'Arne', color: 'red'},
    {name: 'Bertil', color: 'blue'},
    {name: 'Sven', color: 'green'},
  ]

  /*
  return <Reorder
    reorderId="myList2"
    component="ul"
    className={'myList myList2'}
    placeholderClassName={'placeholder'}
    draggedClassName={'dragged'}
    lock="vertical"
    holdTime={250}
    onReorder={(arg) => console.log('reorder', arg)}
    disabled={false}
  >
    {
      list.map(({name, color}) => (
        <li
          key={name}
          className={'listItem listItem2'}
          style={{color: color}}
          onClick={() => console.log('onCLick')}
        >
          {name}
        </li>
      ))
    }
  </Reorder>
  */

  return <Reorder
    reorderId='my-list' // Unique ID that is used internally to track this list (required)
//    reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
//    getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
 //   component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
//    placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
//    draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
    lock='vertical' // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
    holdTime={200} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
    touchHoldTime={200} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
    mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
    onReorder={(arg) => console.log('onReorder', arg)} // Callback when an item is dropped (you will need this to update your state)
    autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
    disabled={false} // Disable reordering (optional), defaults to false
//    disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
//    placeholder={
//      <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
//    }
  >
    {
      columns.map((column, i) => <Column key={`col${i}`} data={column} />)
    }
  </Reorder>
/*
  return <Reorder
    // The key of each object in your list to use as the element key
//    itemKey='name'
    // Lock horizontal to have a vertical list
    lock='vertical'
    // The milliseconds to hold an item for before dragging begins
    holdTime={500}
    // The list to display
    list={columns}
    // A template to display for each list item
    template={Column}
    // Function that is called once a reorder has been performed
    callback={(asdf) => console.log('callback', asdf)}
    // Class to be applied to the outer list element
    listClass='my-list'
    // Class to be applied to each list item's wrapper element
    itemClass='list-item'
    // A function to be called if a list item is clicked (before hold time is up)
    itemClicked={(asdf) => console.log('itemClicked', asdf)}
    // The item to be selected (adds 'selected' class)
    selected={columns[0]}
    // The key to compare from the selected item object with each item object
    selectedKey='uuid'
    // Allows reordering to be disabled
    disableReorder={false}
  />
  */
}

export default App
