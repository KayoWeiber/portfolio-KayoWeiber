export const BIRTH_DATE = new Date(2005, 2, 10);

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()) {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    referenceDate.getMonth() > birthDate.getMonth() ||
    (referenceDate.getMonth() === birthDate.getMonth() &&
      referenceDate.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
}
