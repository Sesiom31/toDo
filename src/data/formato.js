import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date = new Date()) => {
  const dateFormated = format(date, `EEEE, dd  'de' MMMM`, { locale: es }).replace(
    /\w+$/,
    (match) => match.charAt(0).toUpperCase() + match.slice(1)
  );

  return dateFormated;
};
