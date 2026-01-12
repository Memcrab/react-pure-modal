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
- [ ] Mobile-friendly gestures

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

## Options

- `isOpen` (boolean) - controls whether the modal is rendered; defaults to `false`.
- `onClose` (VoidFunction) - called when the user clicks the close button, presses ESC, or (optionally) clicks the backdrop; set `isOpen` to `false` inside it. Any return value is ignored.
- `closeOnBackdropClick` (boolean) - if `true`, clicking the backdrop calls `onClose` (default is `false`).
- `style` (CSS custom properties) - inline CSS variables applied to the backdrop element; use this to set the variables listed below. TypeScript users can reference the exported `ModalCssVariable` union for autocomplete.
- `portal` (Element | DocumentFragment | null) - when provided, render the modal into the target via `createPortal`. If set during SSR (no `document`), the modal returns `null`.
- `children` - compose the modal from the provided compounds: `Modal.Close`, `Modal.Header`, `Modal.Content`, and `Modal.Footer`.

## CSS Variables

All variables can be provided through the `style` prop (e.g. `style={{ "--radius": "16px" }}`). Close button variables apply when `Modal.Close` is rendered.

- `--radius` - border radius of the modal container (mobile uses `12px 12px 0 0`).
- `--aspect-ratio` - forced aspect ratio for the modal grid.
- `--backdrop-filter` - value for the backdrop `backdrop-filter` property.
- `--backdrop-color` - background color of the overlay.
- `--box-shadow` - shadow applied to the modal panel.
- `--max-width` - maximum width of the modal.
- `--max-height` - maximum height of the modal.
- `--min-width` - minimum width of the modal.
- `--background` - modal surface background.
- `--background-panels` - background for header and footer panels.
- `--close-button-background` - background for the close icon circle.
- `--close-button-border` - border applied to the close icon circle (defaults to `var(--dividers-border)`).
- `--close-button-size` - diameter of the close icon circle.
- `--close-button-container-padding` - extra tap target padding around the close icon.
- `--close-button-container-transform` - transform applied to the close button container (for positional nudges).
- `--close-button-hover-transform` - transform applied to the close icon on hover.
- `--z-index` - base stacking level for the backdrop (panel uses `+1`).
- `--top-content-padding` / `--bottom-content-padding` - vertical padding for the content area.
- `--top-header-padding` / `--bottom-header-padding` - vertical padding for the header.
- `--top-footer-padding` / `--bottom-footer-padding` - vertical padding for the footer.
- `--left-padding` / `--right-padding` - horizontal padding shared across sections.
- `--dividers-color` - border color for header/footer dividers (also used as the default close icon border).
- `--dividers-border` - border applied to header/footer dividers (defaults to `1px solid var(--dividers-color)`).


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
