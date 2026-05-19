import Modal from './Modal.jsx'
import Button from './Button.jsx'

function AlertDialog({
  open,
  title = 'Please confirm',
  description = 'Are you sure you want to continue?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={[
        <Button key="cancel" variant="outline" onClick={onCancel}>{cancelLabel}</Button>,
        <Button key="confirm" variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>,
      ]}
    >
      <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </Modal>
  )
}

export default AlertDialog
