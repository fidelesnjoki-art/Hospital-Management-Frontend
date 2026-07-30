// The backend supplies this field on every doctor/admin appointment object.
// Never fall back to a username, email, or placeholder on clinical screens.
export default function patientName(appointment) {
  return appointment?.patient_full_name
}
