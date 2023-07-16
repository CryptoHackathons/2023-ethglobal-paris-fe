export function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function getDemoDateString(date) {
  return date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
}

export function serializeLotteries(lotteries) {
  return lotteries.map((lottery) => {
    return {
      ...lottery,
      createdAt: new Date(lottery.createdAt),
      updatedAt: new Date(lottery.updatedAt),
      startTime: new Date(lottery.startTime),
      endTime: new Date(lottery.endTime),
      description: lottery.description.split('\n\n'),
      missions: JSON.parse(lottery.missions),
      prizes: JSON.parse(lottery.prizes),
    };
  });
}
