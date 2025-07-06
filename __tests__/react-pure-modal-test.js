import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Modal from '../dist/react-pure-modal.min.js';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

it('Should be null without props', () => {
  let component;
  act(() => {
    component = renderer.create(<Modal />);
  });
  expect(component.toJSON()).toBeNull();
  act(() => {
    component.unmount();
  });
});

it('Should be closed', () => {
  let component;
  act(() => {
    component = renderer.create(<Modal isOpen={false} />);
  });
  expect(component.toJSON()).toMatchSnapshot();
  act(() => {
    component.unmount();
  });
});

it('Should show content', () => {
  let component;
  act(() => {
    component = renderer.create(
      <Modal isOpen>
        <span>Some content of modal</span>
      </Modal>,
    );
  });
  expect(component.toJSON()).toMatchSnapshot();
  act(() => {
    component.unmount();
  });
});

it('Should show only content', () => {
  let component;
  act(() => {
    component = renderer.create(
      <Modal replace isOpen>
        <span>Some content of modal</span>
      </Modal>,
    );
  });
  expect(component.toJSON()).toMatchSnapshot();
  act(() => {
    component.unmount();
  });
});

it('Should contain width attribute', () => {
  let component;
  act(() => {
    component = renderer.create(
      <Modal replace width="400px" isOpen>
        <span>Some content of modal</span>
      </Modal>,
    );
  });
  expect(component.toJSON()).toMatchSnapshot();
  act(() => {
    component.unmount();
  });
});
