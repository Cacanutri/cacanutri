export function addBusinessHours(start: Date, hours: number) {
  let current = new Date(start);
  let remaining = hours;

  while (remaining > 0) {
    current.setHours(current.getHours() + 1);
    const day = current.getDay();
    if (day != 0 && day != 6) remaining -= 1;
  }

  return current;
}
