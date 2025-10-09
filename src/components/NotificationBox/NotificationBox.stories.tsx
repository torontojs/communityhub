import type { Meta, StoryObj } from '@storybook/react-vite';

import NotificationBox from './NotificationBox.tsx';

import { fn } from 'storybook/test';

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

export const InfoNotificationBox: Story = {
	args: {
		title: 'Notification box title',
		children: 'Notification box content',
		variant: 'info',
		onDismiss: fn()
	}
};

export const ErrorNotificationBox: Story = {
	args: {
		title: 'Notification box title',
		children: 'Notification box content',
		variant: 'error',
		onDismiss: fn()
	}
};

export const SuccessNotificationBox: Story = {
	args: {
		title: 'Notification box title',
		children: 'Notification box content',
		variant: 'success',
		onDismiss: fn()
	}
};

export const WarningNotificationBox: Story = {
	args: {
		title: 'Notification box title',
		children: 'Notification box content',
		variant: 'warning',
		onDismiss: fn()
	}
};
