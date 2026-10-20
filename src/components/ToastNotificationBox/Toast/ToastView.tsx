import type { ToastNotificationProps } from './ToastModel.ts';
import './Toast.css';

interface ToastNotificationViewProps extends ToastNotificationProps {
  isToastHidden?: boolean;
}

const toastVariants: Record<ToastNotificationProps['variant'], string> = {
  info: 'icon-info',
  success: 'icon-success-with-border',
  warning: 'icon-warning',
  error: 'icon-error-with-border'
};

function ToastNotificationView({ title, variant, onDismiss, children, isToastActive = false, isToastHidden = false, timer = 100 }: ToastNotificationViewProps) {
  return (
    <div className={`notification-box-wrapper-slide${isToastHidden ? ' toast-hidden' : ''}`} data-variant={variant} role={variant === 'error' ? 'alert' : 'status'} aria-live='polite' aria-atomic='true'>
      <div className='notification-box' >
        <h2 className='title text-h2'>{title}</h2>
        <svg>
        <use href={`#${toastVariants[variant]}`} />
      </svg>
      <div className='content'>{children}</div>
    <button aria-label='Dismiss notification' onClick={onDismiss}>
        <svg>
          <use href='#icon-close' />
        </svg>
        <span aria-hidden='true'>Close</span>
      </button>
      </div>
      {isToastActive && <progress value={timer} max='100' className='progress-bar'></progress>}
    
    </div>
  );
}

export default ToastNotificationView;