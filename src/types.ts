import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}

export interface SwapThemeToDayHandler extends EventHandler {
  name: "SWAP_TO_DAY";
  handler: () => void;
}

export interface SwapThemeToNightHandler extends EventHandler {
  name: "SWAP_TO_NIGHT";
  handler: () => void;
}
