import { Button } from '../src/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
};

export default meta;

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
  },
};