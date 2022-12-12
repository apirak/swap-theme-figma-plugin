import { on, once, showUI } from "@create-figma-plugin/utilities";
// import { CloseHandler, CreateRectanglesHandler } from "./types";
import {
  SwapThemeToDayHandler,
  SwapThemeToNightHandler,
  SetDayFolderHandler,
  SetNightFolderHandler,
} from "./types";
import {
  initPlugin,
  justSwapToDay,
  justSwapToNight,
  setDayFolder,
  setNightFolder,
  getDayFolder,
  getNightFolder,
} from "./swap";
import { emit } from "@create-figma-plugin/utilities";

export default function () {
  on<SetDayFolderHandler>("SET_DAY_FOLDER", function (newName: string) {
    console.log("call set night folder to:", newName);
    setDayFolder(newName);
  });

  on<SetNightFolderHandler>("SET_NIGHT_FOLDER", function (newName: string) {
    console.log("call set day folder to:", newName);
    setNightFolder(newName);
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
  const setupUI = (async () => {
    await initPlugin();
    await emit<SetDayFolderHandler>("SET_DAY_FOLDER", getDayFolder());
    await emit<SetNightFolderHandler>("SET_NIGHT_FOLDER", getNightFolder());
  })();
}
