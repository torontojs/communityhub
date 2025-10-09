import type { Meta, StoryObj } from '@storybook/react-vite';

import NotificationBox from './NotificationBox.tsx';

const meta: Meta<typeof NotificationBox> = {
	title: 'Components/Notification Boxes',
	component: NotificationBox,
	parameters: {
		layout: 'centered',
		controls: { expanded: true }
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof NotificationBox>;

export const Info: Story = {
	args: {
		title: 'Notification box title',
		children: 'Notification box content',
		variant: 'info'
	}
};
