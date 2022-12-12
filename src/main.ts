import { on, once, showUI } from "@create-figma-plugin/utilities";
// import { CloseHandler, CreateRectanglesHandler } from "./types";
import {
  SwapThemeToDayHandler,
  SwapThemeToNightHandler,
  SetDayFolderHandler,
  SetNightFolderHandler,
} from "./types";
import { initPlugin, justSwapToDay, justSwapToNight } from "./swap";
import { emit } from "@create-figma-plugin/utilities";

export default function () {
  initPlugin();

  on<SetNightFolderHandler>("SET_NIGHT_FOLDER", function (newName: string) {
    console.log("SET NIGHT Folder To:", newName);
  });

  on<SetDayFolderHandler>("SET_DAY_FOLDER", function (newName: string) {
    console.log("SET DAY Folder To:", newName);
  });

  on<SwapThemeToDayHandler>("SWAP_TO_DAY", function () {
    console.log("call justSwapToDay()");
    justSwapToDay();
  });

  on<SwapThemeToNightHandler>("SWAP_TO_NIGHT", function () {
    console.log("call justSwapToNight()");
    justSwapToNight();
  });

  showUI({ height: 150, width: 300 });

  emit<SetDayFolderHandler>("SET_DAY_FOLDER", "SunDay");
  emit<SetNightFolderHandler>("SET_NIGHT_FOLDER", "MidNight");
}
