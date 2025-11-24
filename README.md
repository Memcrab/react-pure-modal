# react-pure-modal [![npm package](https://img.shields.io/npm/v/react-pure-modal.svg?style=flat-square)](https://www.npmjs.org/package/react-pure-modal) [![Build Status](https://travis-ci.org/memCrab/react-pure-modal.svg?branch=master)](https://travis-ci.org/memCrab/react-pure-modal)

[![NPM](https://nodei.co/npm/react-pure-modal.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-pure-modal/)

React pure modal is a simplest way to create dialog on your site.

## Features
[x] Lightweight, no external dependencies, 4.1Kb GZip including CSS
[x] Easy change modal components, they all independent but works well together
[x] Close only current modal on ESC or Backdrop
[x] Easy change modal proportions
[x] Easy change modal appearence with variables
[x] Dynamic width based on content
[x] Stop background scrolling when focus in modal
[x] Mobile friendly safe areas
[x] Smooth animations
[ ] Mobile friendly gestures

## Demo

https://memcrab.github.io/react-pure-modal/

## Installation

`npm i -S react-pure-modal`

## Usage

```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  closeOnBackdropClick
>
  <Modal.Close />
  <Modal.Header>
    <h2>Seconds Modal</h2>
  </Modal.Header>
  <Modal.Content>
    <h1>some main content</h1>
    <p>some content here</p>
  </Modal.Content>
  <Modal.Footer>footer content</Modal.Footer>
</Modal>
```

## Options

- `isOpen` (boolean, required) - controls whether the modal is rendered.
- `onClose` (() => boolean | void) - called when the user clicks the close button, presses ESC, or (optionally) clicks the backdrop; set `isOpen` to `false` inside it.
- `closeOnBackdropClick` (boolean) - if `true`, clicking the backdrop calls `onClose` (default is `false`).
- `style` (React.CSSProperties) - inline styles applied to the backdrop element; use this to set CSS custom properties (listed below) or to tweak things like `zIndex`.
- `children` - compose the modal from the provided compounds: `Modal.Close`, `Modal.Header`, `Modal.Content`, and `Modal.Footer`.

## CSS Variables

All variables can be provided through the `style` prop (e.g. `style={{ "--radius": "16px" }}`).

- `--radius` - border radius of the modal container (mobile uses `12px 12px 0 0`).
- `--aspect-ratio` - forced aspect ratio for the modal grid.
- `--backdrop-blur` - available for custom use if you want to reference a blur amount.
- `--backdrop-filter` - value for the backdrop `backdrop-filter` property.
- `--backdrop-color` - background color of the overlay.
- `--box-shadow` - shadow applied to the modal panel.
- `--max-width` - maximum width of the modal.
- `--max-height` - maximum height of the modal.
- `--min-width` - minimum width of the modal.
- `--background` - modal surface background.
- `--background-panels` - background for header and footer panels.
- `--z-index` - base stacking level for the backdrop (panel uses `+1`).
- `--top-content-padding` / `--bottom-content-padding` - vertical padding for the content area.
- `--top-header-padding` / `--bottom-header-padding` - vertical padding for the header.
- `--top-footer-padding` / `--bottom-footer-padding` - vertical padding for the footer.
- `--left-padding` / `--right-padding` - horizontal padding shared across sections.
- `--dividers-color` - color for border dividers.
- `--border` - border applied to header and footer.


## Changelog (latest on top)

- Migration to compound components after 7 years with previous API
- Removed double calling onClose on popup closing and unmount. onClose will be called only on: close button, backdrop, esc click
- Drag and drop
- fix bug in firefox and safari with modal position
- set width as atribute
- new default aligning to the screen center!
- prevent of modal closing if ESC pressed in editable element
- now with minified css!
- styles are more impressive now, good mobile support
- now scrollable can be false
- remove dependencies, rewrite open and close logic, fix linting
- new header logic and breaking classes changes


## Development

Install the dependencies:

```bash
npm install
```


## Approach Details

You can't use css `fixed` positioning because it stops using any nested modals. Modal nesting is well known bad UX pattern, but still sometimes in very rare cases you really need that.

We can't use sticky, because scrollbar appears over the sticky elements, which looks weird

HTML dialog tag can't be used due to lack of nesting and bad imperative interface. Like backdrop will be shown only when you open it with JS API `openModal()`, so no SSR support.

HTML popover can't be used due to low support accross browsers.

## Get started

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```
