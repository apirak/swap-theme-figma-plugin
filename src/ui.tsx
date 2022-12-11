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

  const [value, setValue] = useState<string>("Day");
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
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
          <Textbox onInput={handleInput} value={value} variant='underline' />
        </div>
        <IconButton onClick={handleSwapToDayClick}>
          <IconSwap32 />
        </IconButton>
      </div>
      <VerticalSpace space='extraSmall' />
      <div class={styles.themeRow}>
        <MiddleAlign style={label}>Night:</MiddleAlign>
        <div class={styles.inputValue}>
          <Textbox onInput={handleInput} value={"Night"} variant='underline' />
        </div>
        <IconButton style={swapIcon} onClick={handleSwapToNightClick}>
          <IconSwap32 />
        </IconButton>
      </div>
    </Container>
  );
}

export default render(Plugin);
