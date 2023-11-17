import { SunIcon, StarIcon, CalendarDaysIcon, ListBulletIcon } from '@heroicons/react/24/outline';

export const categories = [
  {
    id: 1,
    name: 'Mi Día',
    category: 'day',
    icon: SunIcon,
    count: 0,
    added:false
  },
  {
    id: 2,
    name: 'Importante',
    category: 'important',
    icon: StarIcon,
    count: 0,
    added:false
  },
  {
    id: 3,
    name: 'Planeado',
    category: 'planned',
    icon: CalendarDaysIcon,
    count: 0,
    added:false
  },
  {
    id: 4,
    name: 'Tareas',
    category: 'tasks',
    icon: ListBulletIcon,
    count: 0,
    added:false
  },
];
