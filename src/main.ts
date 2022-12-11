import { on, once, showUI } from "@create-figma-plugin/utilities";
// import { CloseHandler, CreateRectanglesHandler } from "./types";
import {
  SwapThemeToDayHandler,
  SwapThemeToNightHandler,
  SetDayFolderHandler,
  SetNightFolderHandler,
} from "./types";
import { initPlugin, justSwapToDay, justSwapToNight } from "./swap";

export default function () {
  initPlugin();

  // once<CloseHandler>("CLOSE", function () {
  //   figma.closePlugin();
  // });

  on<SetNightFolderHandler>("SET_NIGHT_FOLDER", function () {
    console.log("SET NIGHT Folder");
  });

  on<SetDayFolderHandler>("SET_DAY_FOLDER", function () {
    console.log("SET DAY Folder");
  });

  on<SwapThemeToDayHandler>("SWAP_TO_DAY", function () {
    console.log("call justSwapToDay()");
    justSwapToDay();
  });

  on<SwapThemeToNightHandler>("SWAP_TO_NIGHT", function () {
    console.log("call justSwapToNight()");
    justSwapToNight();
  });

  showUI({
    height: 150,
    width: 300,
  });
}
