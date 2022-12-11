import { once, showUI } from "@create-figma-plugin/utilities";
// import { CloseHandler, CreateRectanglesHandler } from "./types";
import { SwapThemeToDayHandler, SwapThemeToNightHandler } from "./types";
import { initPlugin, justSwapToDay, justSwapToNight } from "./swap";

export default function () {
  initPlugin();

  // once<CloseHandler>("CLOSE", function () {
  //   figma.closePlugin();
  // });

  once<SwapThemeToDayHandler>("SWAP_TO_DAY", function () {
    justSwapToDay();
  });

  once<SwapThemeToNightHandler>("SWAP_TO_NIGHT", function () {
    justSwapToNight();
  });

  showUI({
    height: 150,
    width: 300,
  });
}
