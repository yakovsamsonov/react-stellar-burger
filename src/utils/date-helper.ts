export function getDateLabel(isoDate: string) : string {
  const currentTime = new Date();
  const orderTime = new Date(isoDate);
  const daysBetween = Math.floor(currentTime.getDate() - orderTime.getDate());

  let periodLabel = '';
  switch (daysBetween) {
    case 0: {
      periodLabel = 'Сегодня';
      break;
    }
    case 1: {
      periodLabel = 'Вчера';
      break;
    }
    case 2: {
      periodLabel = '2 дня назад';
      break;
    }
    default: {
      periodLabel = `${daysBetween} дней назад`;
    }
  }

  return `${periodLabel}, ${orderTime.getHours()}:${
    orderTime.getMinutes() < 10
      ? `0${orderTime.getMinutes()}`
      : orderTime.getMinutes()
  } i-GMT+${-orderTime.getTimezoneOffset() / 60}`;
}
