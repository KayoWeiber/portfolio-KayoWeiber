export function calculateDurationInMonths(startDate: Date, endDate: Date = new Date()) {
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    (endDate.getDate() >= startDate.getDate() ? 1 : 0);

  return Math.max(totalMonths, 1);
}
