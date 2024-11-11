import React from "react";
import { DragDropContext, Droppable, Draggable, DraggableProvided, DroppableProvided, DraggableStateSnapshot, DroppableStateSnapshot } from "react-beautiful-dnd";

const grid = 8;

interface SubItem {
  id: string;
  content: string;
}

interface ServiceCommandUnitProps {
  subItems: SubItem[];
  type: string;
}

const getItemStyle = (isDragging: boolean, draggableStyle: React.CSSProperties): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px 10px 0`,
  display: "inline-flex",
  width: "120px",
  background: isDragging ? "lightgreen" : "grey",
  border: "1px solid grey",
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  margin: "10px 0"
});

const ServiceCommandUnit: React.FC<ServiceCommandUnitProps> = ({ subItems, type }) => {
  return (
    <Droppable droppableId={type} type="droppableSubItem">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div ref={provided.innerRef} style={{...getListStyle(snapshot.isDraggingOver)}}>
          {subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div style={{ display: "flex", width: '100%' }}>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{...getItemStyle(snapshot.isDragging, provided.draggableProps.style || {}), width: '100%'}}
                  >
                    {item.content}
                    <span
                      {...provided.dragHandleProps}
                      style={{
                        display: "block",
                        margin: "0 10px",
                        border: "1px solid #000"
                      }}
                    >
                      Drag
                    </span>
                  </div>
                  {provided?.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ServiceCommandUnit;
