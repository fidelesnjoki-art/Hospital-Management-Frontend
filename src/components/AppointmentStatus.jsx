const labels = { pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' }
const styles = { pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-sky-100 text-sky-800', completed: 'bg-emerald-100 text-emerald-800', cancelled: 'bg-rose-100 text-rose-800' }

export default function AppointmentStatus({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{labels[status] || status}</span>
}
