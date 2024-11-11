import React, { useState, useCallback, StrictMode } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import ServiceCommandUnit from "./ServiceCommandUnit";
import { createRoot } from "react-dom/client";

interface Item {
  id: string;
  content: string;
  subItems: SubItem[];
}

interface SubItem {
  id: string;
  content: string;
}

// Export static items array with type annotation
const static_items: Item[] = [
  {
    id: "1",
    content: "item 1 content",
    subItems: [
      {
        id: "10",
        content: "SubItem 10 content"
      },
      {
        id: "11",
        content: "SubItem 11 content"
      }
    ]
  },
  {
    id: "2",
    content: "item 2 content",
    subItems: [
      {
        id: "20",
        content: "SubItem 20 content"
      },
      {
        id: "21",
        content: "SubItem 21 content"
      }
    ]
  }
];


const grid = 8;

// Helper function to reorder list
const reorder = (list: Item[] | SubItem[], startIndex: number, endIndex: number): Item[] | SubItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: React.CSSProperties): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 200
});

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(static_items);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (result.type === "droppableItem") {
      const reorderedItems = reorder(items, sourceIndex, destIndex) as Item[];
      setItems(reorderedItems);

    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap: { [key: string]: SubItem[] } = items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {} as { [key: string]: SubItem[] });

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...items];

      /** Reorder within the same parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceSubItems, sourceIndex, destIndex);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            return { ...item, subItems: reorderedSubItems };
          }
          return item;
        });
        setItems(newItems);

      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);

        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            return { ...item, subItems: newSourceSubItems };
          } else if (item.id === destParentId) {
            return { ...item, subItems: newDestSubItems };
          }
          return item;
        });
        setItems(newItems);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="droppableItem">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={{...getListStyle(snapshot.isDraggingOver), width: '100%'}}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div style={{width: '100%'}}>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided?.draggableProps?.style ? {...provided?.draggableProps?.style} : {} )}
                    >
                      {item.content}
                      <span
                        {...provided.dragHandleProps}
                        style={{ display: "inline-block", margin: "0 10px", border: "1px solid #000" }}
                      >
                        Drag
                      </span>
                      {item.subItems && <ServiceCommandUnit subItems={item.subItems} type={item.id} />}
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
    </DragDropContext>
  );
};

createRoot(document.getElementById('root')!).render(
    <App />
)
