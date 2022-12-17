# Swap Theme Figma Plugin

This plugin use for swap UI between two style by use folder name as reference.

![Cover Page](images/cover_art.png)

## How to use

Create style folder and use folder name as style name Select Frames you want to
swap theme Open UI of plugin (You can config style name here Click "Swap" for
change Theme

## Short cut

Select Frames you want to swap theme Open Quick action by type Cmd + / Call
"Swap to Day" or "Swap to Night" to Swap theme

🧑‍💻 Code https://github.com/apirak/swap-theme-figma-plugin

## Note

This plugin inspire by
[Appearance Figma Plugin](https://github.com/glmrvn/Appearance-figma-plugin/tree/master).
and adds the ability to match style names with concealed spaces

For instance, this plugin will be able to match the varying white space in this
style's name.

Day / Primary <- Can match with -> Night/Primary

Day /Primary <- Can match with -> Night/ Primary

## Development guide

_This plugin is built with
[Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/)._

### Pre-requisites

- [Node.js](https://nodejs.org) – v16
- [Figma desktop app](https://figma.com/downloads/)

### Build the plugin

To build the plugin:

```
$ npm run build
```

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

To test

```
$ npm run test
```
