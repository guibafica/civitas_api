export function validateCourseNumber(courseNumber: number): string {
  const courseNumberAsString = String(courseNumber);

  if (!/^\d{1,3}$/.test(courseNumberAsString)) {
    throw new Error("Course Number must be a number with up to three digits.");
  }

  return courseNumberAsString.padStart(3, "0");
}
