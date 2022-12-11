import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  IconSwap32,
  Textbox,
  MiddleAlign,
  Inline,
  IconButton,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState } from "preact/hooks";
import styles from "./style.css";

import {
  CloseHandler,
  CreateRectanglesHandler,
  SwapThemeToDayHandler,
  SwapThemeToNightHandler,
  SetDayFolderHandler,
  SetNightFolderHandler,
} from "./types";

function Plugin() {
  // const [count, setCount] = useState<number | null>(5);
  // const [countString, setCountString] = useState("5");
  // const handleCreateRectanglesButtonClick = useCallback(
  //   function () {
  //     if (count !== null) {
  //       emit<CreateRectanglesHandler>("CREATE_RECTANGLES", count);
  //     }
  //   },
  //   [count]
  // );

  const [dayFolder, setDayFolder] = useState<string>("Day");
  function handleDayInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log("day:", newValue);
    setDayFolder(newValue);
    emit<SetDayFolderHandler>("SET_DAY_FOLDER");
  }

  const [nightFolder, setNightFolder] = useState<string>("Night");
  function handleNightInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log("night:", newValue);
    setNightFolder(newValue);
    emit<SetNightFolderHandler>("SET_NIGHT_FOLDER");
  }

  const handleSwapToDayClick = useCallback(function () {
    emit<SwapThemeToDayHandler>("SWAP_TO_DAY");
  }, []);

  const handleSwapToNightClick = useCallback(function () {
    emit<SwapThemeToNightHandler>("SWAP_TO_NIGHT");
  }, []);

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  function handleClick(event: JSX.TargetedEvent<HTMLButtonElement>) {
    console.log(event);
  }

  const label = {
    "justify-content": "unset",
    width: "48px",
  };

  const swapIcon = {
    width: "30px",
  };

  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text>
        <Muted>Set Folder name for Day theme and Night theme.</Muted>
      </Text>
      <VerticalSpace space='extraLarge' />
      <div class={styles.themeRow}>
        <MiddleAlign style={label}>Day:</MiddleAlign>
        <div class={styles.inputValue}>
          <Textbox
            onInput={handleDayInput}
            value={dayFolder}
            variant='underline'
          />
        </div>
        <IconButton onClick={handleSwapToDayClick}>
          <IconSwap32 />
        </IconButton>
      </div>
      <VerticalSpace space='extraSmall' />
      <div class={styles.themeRow}>
        <MiddleAlign style={label}>Night:</MiddleAlign>
        <div class={styles.inputValue}>
          <Textbox
            onInput={handleNightInput}
            value={nightFolder}
            variant='underline'
          />
        </div>
        <IconButton style={swapIcon} onClick={handleSwapToNightClick}>
          <IconSwap32 />
        </IconButton>
      </div>
    </Container>
  );
}

export default render(Plugin);
