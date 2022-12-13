import {
  Container,
  Muted,
  render,
  Text,
  VerticalSpace,
  IconSwap32,
  Textbox,
  MiddleAlign,
  IconButton,
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState } from "preact/hooks";
import styles from "./style.css";

import {
  SwapThemeToDayHandler,
  SwapThemeToNightHandler,
  SetDayFolderHandler,
  SetNightFolderHandler,
} from "./types";

function Plugin() {
  const [dayFolder, setDayFolder] = useState<string>("Day");
  const [nightFolder, setNightFolder] = useState<string>("Night");

  function handleDayInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;
    setDayFolder(newName);
    emit<SetDayFolderHandler>("SET_DAY_FOLDER", newName);
  }

  function handleNightInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;
    setNightFolder(newName);
    emit<SetNightFolderHandler>("SET_NIGHT_FOLDER", newName);
  }

  const handleSwapToDayClick = useCallback(function () {
    emit<SwapThemeToDayHandler>("SWAP_TO_DAY");
  }, []);

  const handleSwapToNightClick = useCallback(function () {
    emit<SwapThemeToNightHandler>("SWAP_TO_NIGHT");
  }, []);

  on<SetDayFolderHandler>("SET_DAY_FOLDER", (newName: string) => {
    setDayFolder(newName);
  });

  on<SetNightFolderHandler>("SET_NIGHT_FOLDER", (newName: string) => {
    setNightFolder(newName);
  });

  const label = {
    "justify-content": "unset",
    width: "48px",
  };

  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text>
        <Muted>Set folder name for Day theme and Night theme.</Muted>
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
        <IconButton onClick={handleSwapToNightClick}>
          <IconSwap32 />
        </IconButton>
      </div>
    </Container>
  );
}

export default render(Plugin);
