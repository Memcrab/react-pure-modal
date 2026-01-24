# react-pure-modal [![npm package](https://img.shields.io/npm/v/react-pure-modal.svg?style=flat-square)](https://www.npmjs.org/package/react-pure-modal) [![Build Status](https://travis-ci.org/memCrab/react-pure-modal.svg?branch=master)](https://travis-ci.org/memCrab/react-pure-modal)

[![NPM](https://nodei.co/npm/react-pure-modal.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-pure-modal/)

React pure modal is a simplest way to create dialog on your site.

## Features

- [x] Lightweight, no external dependencies, 4.1Kb GZip including CSS
- [x] Easy-to-swap modal components; independent but designed to work together
- [x] Close only the current modal on ESC or backdrop
- [x] Easy change modal proportions
- [x] Easy change modal appearance with variables
- [x] Dynamic width based on content
- [x] Stop background scrolling when focused in modal
- [x] Mobile-friendly safe areas
- [x] Smooth animations
- [x] Mobile-friendly gestures
- [ ] Passing animation promise to onClose

## Demo

https://memcrab.github.io/react-pure-modal/

## Installation

`npm i -S react-pure-modal`

## Usage

```jsx
import Modal from "react-pure-modal";

<Modal
  isOpen={isOpen}
  onClose={onClose}
  closeOnBackdropClick
>
  <Modal.Close />
  <Modal.Header>
    <h2>Second Modal</h2>
  </Modal.Header>
  <Modal.Content>
    <h1>some main content</h1>
    <p>some content here</p>
  </Modal.Content>
  <Modal.Footer>footer content</Modal.Footer>
</Modal>
```

## Context

Use the exported context hook when you need modal state inside custom children (for example, a custom close button passed into `Modal.Close`).

```jsx
import Modal, { useModalContext } from "react-pure-modal";

function CustomCloseContent() {
  const { onClose } = useModalContext();
  return (
    <button type="button" onClick={() => onClose?.()}>
      Save & Close
    </button>
  );
}

<Modal.Close>
  <CustomCloseContent />
</Modal.Close>
```

The context provides: `isOpen`, `onClose`, `closeOnBackdropClick`, and `style`.

`Modal.Close` renders the default icon button when no children are provided.

## Portal

Render the modal into a dedicated DOM node (for example, a `#modal-root`
mounted near `body`).

```jsx
import Modal from "react-pure-modal";

const portalRoot = document.getElementById("modal-root");

<Modal isOpen={isOpen} onClose={onClose} portal={portalRoot}>
  <Modal.Close />
  <Modal.Content>Portal content</Modal.Content>
</Modal>
```

## Options

- `id` (string) - optional identifier for the modal container. The modal element id is rendered as `pure-modal-${id}`; when omitted, it uses `useId()` for a unique suffix.
- `isOpen` (boolean) - controls whether the modal is rendered; defaults to `false`.
- `onClose` (VoidFunction) - called when the user clicks the close button, presses ESC, or (optionally) clicks the backdrop; set `isOpen` to `false` inside it. Any return value is ignored.
- `closeOnBackdropClick` (boolean) - if `true`, clicking the backdrop calls `onClose` (default is `false`).
- `style` (CSS custom properties) - inline CSS variables applied to the backdrop element; use this to set the variables listed below. TypeScript users can reference the exported `ModalCssVariable` union for autocomplete.
- `portal` (Element | DocumentFragment | null) - when provided, render the modal into the target via `createPortal`. If set during SSR (no `document`) or the node is missing, the modal returns `null`.
- `children` - compose the modal from the provided compounds: `Modal.Close`, `Modal.Header`, `Modal.Content`, and `Modal.Footer`.

## Swipe to close

Enable swipe gestures on mobile by rendering `Modal.Handle`. Swipes start only when the initial touch is on the handle.

```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
>
  <Modal.Handle position="top" />
  <Modal.Close />
  <Modal.Content>Swipe the backdrop to close</Modal.Content>
</Modal>
```

## Compound component props

- `Modal.Header align` (`"start" | "center" | "end"`) - horizontal alignment for header content (default: `start`).
- `Modal.Footer align` (`"start" | "center" | "end"`) - horizontal alignment for footer content (default: `start`).
- `Modal.Handle position` (`"left" | "right" | "top" | "bottom"`) - renders a mobile-only swipe handle with an expanded hit area outside the modal; respects `--swipe-handle-gap`.

## CSS Variables

All variables can be provided through the `style` prop (e.g. `style={{ "--radius-top-left": "16px" }}`). Close button variables apply when `Modal.Close` is rendered.

- `--radius-top-left` - border radius for the modal's top-left corner.
- `--radius-top-right` - border radius for the modal's top-right corner.
- `--radius-bottom-right` - border radius for the modal's bottom-right corner.
- `--radius-bottom-left` - border radius for the modal's bottom-left corner.
- `--radius` - shorthand border radius for all corners (used as the fallback for the four values above).
- `--aspect-ratio` - forced aspect ratio for the modal grid.
- `--backdrop-filter` - value for the backdrop `backdrop-filter` property.
- `--backdrop-color` - background color of the overlay.
- `--backdrop-justify-content` - vertical alignment of the modal inside the backdrop (`center`, `flex-end`, etc).
- `--box-shadow` - shadow applied to the modal panel.
- `--modal-animation` - animation shorthand for the modal panel (defaults to `panelSoftPop`).
- `--width` - base width for the modal panel.
- `--max-width` - min-width for the modal panel.
- `--min-width` - max-width for the modal panel.
- `--max-height` - maximum height of the modal.
- `--background` - modal surface background.
- `--background-panels` - background for header and footer panels.
- `--header-background` - header background (defaults to `--background-panels`).
- `--footer-background` - footer background (defaults to `--background-panels`).
- `--close-button-background` - background for the close icon circle.
- `--close-button-border` - border applied to the close icon circle (defaults to `var(--dividers-border)`).
- `--close-button-size` - diameter of the close icon circle.
- `--close-button-container-transform` - transform applied to the close button container (for positional nudges).
- `--close-button-place-self` - `place-self` value for the close button container (defaults to `start end`).
- `--close-button-grid-row` - grid row for the close button container (defaults to `1`).
- `--close-button-hover-transform` - transform applied to the close icon on hover.
- `--z-index` - base stacking level for the backdrop (panel uses `+1`).
- `--top-content-padding` / `--bottom-content-padding` - vertical padding for the content area.
- `--top-header-padding` / `--bottom-header-padding` - vertical padding for the header.
- `--header-left-padding` / `--header-right-padding` - horizontal padding for the header (defaults to `--left-padding`/`--right-padding`).
- `--top-footer-padding` / `--bottom-footer-padding` - vertical padding for the footer.
- `--left-padding` / `--right-padding` - horizontal padding shared across sections.
- `--dividers-color` - border color for header/footer dividers (also used as the default close icon border).
- `--dividers-border` - border applied to header/footer dividers (defaults to `1px solid var(--dividers-color)`).
- `--swipe-handle-gap` - gap between the modal edge and `Modal.Handle` when positioned outside the modal.


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

## Codex skills

This repo includes local Codex skills under `skills/`. To use one, list it in `AGENTS.md` under "Available skills" and invoke it by name in your request.


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

Run type checks:

```bash
pnpm typecheck
```

## Publishing a new version

1. Bump the package version and rebuild: `npm version <patch|minor|major>` then `npm run build`; commit the updated files (including `dist`) and push to `master`/`main`.
2. Label the merged PRs to drive the next draft version: use `breaking`/`major` for a major bump (e.g. 3.0.0), `feature`/`enhancement` for minor, and `fix`/`bug`/`chore` for patch; Release Drafter uses these labels to compute the `vX.Y.Z` it suggests.
3. Wait for the Release Drafter workflow to refresh the draft release on GitHub (it runs on pushes to the default branch).
4. Open the draft release in the GitHub Releases page, review the generated notes, set the tag name to match the new version (e.g. `v3.0.1`), and publish the release.
5. Publishing the release triggers the `Node.js Package` workflow to publish to npm using the `NPM_TOKEN` repository secret; verify that secret is configured.
6. If you ever need to publish locally instead, run `npm run build` followed by `npm publish --access public` with `NPM_TOKEN` available in your environment.
