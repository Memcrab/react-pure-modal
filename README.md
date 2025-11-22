# Rslib project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Features
[x] Lightweight, no external dependencies
[x] Easy change modal components, they all independent but works well together
[ ] Close only current modal on ESC or Backdrop
[ ] Mobile friendly gestures
[ ] Easy change modal proportions
[ ] Easy change modal appearence with variables
[ ] Stop background scrolling when focus in modal
[ ] 
[ ] 
[ ] 
[ ] 

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
