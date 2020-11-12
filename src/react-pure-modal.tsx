import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import './react-pure-modal.css';

import PureModalContent from './pure-modal-content';

type Props = {
  mode: 'modal' | 'tooltip';
  children: JSX.Element;
  replace: boolean;
  className: string;
  header: JSX.Element | string;
  footer: JSX.Element | string;
  scrollable: boolean;
  draggable: boolean;
  width: string;
  isOpen: boolean;
  onClose: Function;
  closeButton: JSX.Element & string;
  closeButtonPosition: string;
  portal: boolean;
} & typeof defaultProps;

const defaultProps = {
  mode: 'modal',
  replace: false,
  scrollable: true,
  draggable: false,
  portal: false,
};

function PureModal(props: Props) {
  let hash = Math.random().toString();
  const [isDragged, setIsDragged] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [mouseOffsetX, setMouseOffsetX] = useState(0);
  const [mouseOffsetY, setMouseOffsetY] = useState(0);

  const { isOpen, onClose } = props;

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }

    return () => {
      isOpen && close();
    };
  }, [isOpen]);

  const handleEsc = useCallback(event => {
    const allModals = document.querySelectorAll('.pure-modal');

    if (allModals.length && allModals[allModals.length - 1].classList.contains(hash)) return false;

    if (event.keyCode === 27 && document.activeElement) {
      close(event);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  function setModalContext() {
    document.addEventListener('keydown', handleEsc);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.classList.add('body-modal-fix');
  }

  function unsetModalContext() {
    document.removeEventListener('keydown', handleEsc);
    document.body.classList.remove('body-modal-fix');
    setX(null);
    setY(null);
    setDeltaX(0);
    setDeltaY(0);
    setMouseOffsetX(0);
    setMouseOffsetY(0);
  }

  function open(event?) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    setModalContext();
  }

  function close(event?) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (onClose) {
      onClose();
    }

    unsetModalContext();
  }

  function getCoords(e) {
    let { pageX, pageY } = e;
    if (e.changedTouches && e.changedTouches.length === 1) {
      pageX = e.changedTouches[0].pageX;
      pageY = e.changedTouches[0].pageY;
    }
    return {
      pageX,
      pageY,
    };
  }

  function handleStartDrag(e) {
    if (e.changedTouches && e.changedTouches.length > 1) return false;

    e.preventDefault();

    const { pageX, pageY } = getCoords(e);
    const { top, left } = e.currentTarget.getBoundingClientRect();

    setIsDragged(true);
    setX(typeof x === 'number' ? x : left);
    setY(typeof y === 'number' ? y : top);
    setMouseOffsetX(pageX - left);
    setMouseOffsetY(pageY - top);
  }

  function handleDrag(e) {
    if (e.changedTouches && e.changedTouches.lenght > 1) {
      return handleEndDrag();
    }

    e.preventDefault();

    const { pageX, pageY } = getCoords(e);

    setDeltaX(pageX - x - mouseOffsetX);
    setDeltaY(pageY - y - mouseOffsetY);
  }

  function handleEndDrag() {
    return setIsDragged(false);
  }

  function handleBackdropClick(event) {
    if (event) {
      if (!event.target.classList.contains('pure-modal-backdrop')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    close(event);
  }

  const {
    children,
    replace,
    className,
    header,
    footer,
    scrollable,
    draggable,
    width,
    closeButton,
    closeButtonPosition,
    portal,
  } = props;

  let backdropclasses = ['pure-modal-backdrop'];
  let modalclasses = ['pure-modal', hash];
  let bodyClasses = ['panel-body'];

  if (className) {
    modalclasses = modalclasses.concat(className);
  }

  if (scrollable) {
    bodyClasses = bodyClasses.concat('scrollable');
  } else {
    backdropclasses = backdropclasses.concat('scrollable');
    modalclasses = modalclasses.concat('auto-height');
  }

  if (draggable) {
    backdropclasses = backdropclasses.concat('backdrop-overflow-hidden');
  }

  const modalContent = (
    <div
      className={backdropclasses.join(' ')}
      onMouseDown={handleBackdropClick}
      onTouchMove={isDragged ? handleDrag : null}
      onMouseMove={isDragged ? handleDrag : null}
    >
      <div
        className={modalclasses.join(' ')}
        style={{
          transform: `translate(${deltaX}px, ${deltaY}px)`,
          transition: 'none',
          width,
        }}
      >
        <PureModalContent
          replace={replace}
          header={header}
          footer={footer}
          onDragStart={draggable ? handleStartDrag : null}
          onDragEnd={draggable ? handleEndDrag : null}
          onClose={close}
          bodyClass={bodyClasses.join(' ')}
          closeButton={closeButton}
          closeButtonPosition={closeButtonPosition}
        >
          {children}
        </PureModalContent>
      </div>
    </div>
  );

  if (portal) {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

PureModal.defaultProps = defaultProps;

export default PureModal;
