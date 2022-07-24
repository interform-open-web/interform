import dynamic from "next/dynamic";

export const DragDropContext = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);

export const Droppable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Droppable;
  },
  { ssr: false }
);

export const Draggable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Draggable;
  },
  { ssr: false }
);
