export function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function getDemoDateString(date) {
  return date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
}
