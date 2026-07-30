const labels = { pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' }
const styles = { pending: 'status-pending', confirmed: 'status-confirmed', completed: 'status-completed', cancelled: 'status-cancelled' }

export default function AppointmentStatus({ status }) {
  return <span className={`status-badge ${styles[status] || 'status-pending'}`}>{labels[status] || status}</span>
}
