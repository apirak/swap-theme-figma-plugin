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

export interface SetDayFolderHandler extends EventHandler {
  name: "SET_DAY_FOLDER";
  handler: () => void;
}

export interface SetNightFolderHandler extends EventHandler {
  name: "SET_NIGHT_FOLDER";
  handler: () => void;
}
