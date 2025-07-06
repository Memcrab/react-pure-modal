import type React from 'react';

import type { MouseOrTouch } from './types';

type Props = {
  replace: boolean;
  children: JSX.Element;
  onDragStart?: (event: MouseOrTouch) => unknown;
  onDragEnd?: (event: MouseOrTouch) => unknown;
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
  bodyClass?: string;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
  closeButton: JSX.Element | string;
  closeButtonPosition: string;
  draggable: boolean;
};

const defaultProps = {
  closeButton: '×',
  closeButtonPosition: 'header',
  replace: false,
  draggable: false,
};

function PureModalContent(props: Props): JSX.Element {
  const {
    children,
    replace,
    bodyClass,
    header,
    footer,
    onDragStart,
    onDragEnd,
    onClose,
    closeButton,
    closeButtonPosition,
  } = props;

  return replace ? (
    children
  ) : (
    <div
      className={`panel panel-default ${closeButtonPosition === 'bottom' ? 'additional-row' : ''}`}
    >
      <button
        type="button"
        className="panel-heading"
        onTouchStart={onDragStart}
        onMouseDown={onDragStart}
        onTouchEnd={onDragEnd}
        onMouseUp={onDragEnd}
      >
        {header && <h3 className="panel-title">{header}</h3>}
      </button>

      <div className={bodyClass}>{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
      <button
        type="button"
        className="close"
        onClick={onClose}
        style={{
          position: closeButtonPosition === 'header' ? 'absolute' : 'static',
          margin: closeButtonPosition === 'bottom' ? '10px auto' : '',
        }}
      >
        {closeButton}
      </button>
    </div>
  );
}

PureModalContent.defaultProps = defaultProps;

export default PureModalContent;
