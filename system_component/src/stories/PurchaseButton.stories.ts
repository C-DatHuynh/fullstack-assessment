import type { Meta, StoryObj } from '@storybook/react';
import { Item } from './PurchaseItem';
import { PurchaseButton } from './PurchaseButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Purchase Button',
  component: PurchaseButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof PurchaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Test: Story = {
  args: {
    items: [
      { size: '5ml', price: '$20.00' },
      { size: '50ml', price: '$24.00', description: 'short description', tags: ['test'] },
      { size: '500ml', description: 'short description' },
      { size: '1000ml', price: '$300.00', tags: ['bro'] },
    ] as Item[],
  },
};
