export function formatDate(timestampFromFirebase) {
  const milisecond =
    timestampFromFirebase.seconds * 1000 +
    timestampFromFirebase.nanoseconds / 1e6;
  const date = new Date(milisecond);
  return date;
}
