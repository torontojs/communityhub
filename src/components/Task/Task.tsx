import { type ParamHTMLAttributes } from 'react';
import './Task.css';

type TaskStatus = 'pending' | 'completed';

interface Props extends ParamHTMLAttributes<HTMLDivElement> {
	taskStatus?: TaskStatus;
	label: string;
	icon?: React.JSX.Element;
}

export const Task: React.FC<Props> = ({
	taskStatus = 'pending',
	label,
	children,
	...rest
}) => (
	<div className='taskParent' {...rest}>
		<span>
			{taskStatus === 'pending' ?
				(
					<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'>
						<path d='M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z' fill='#ED342F' />
						<path
							d='M17.9414 25L20.3278 10.4545H23.1687L20.7823 25H17.9414ZM11.4925 21.6761L11.9755 18.8352H23.68L23.1971 21.6761H11.4925ZM12.8278 25L15.2141 10.4545H18.055L15.6687 25H12.8278ZM12.3164 16.6193L12.7994 13.7784H24.5039L24.021 16.6193H12.3164Z'
							fill='white'
						/>
					</svg>
				)
				: (
					<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'>
						<path d='M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z' fill='#06D6A0' />
						<path d='M26 12L15 23L10 18' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
					</svg>
				)}
		</span>
		<label>{label}</label>
	</div>
);
