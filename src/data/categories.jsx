import { SunIcon, StarIcon, CalendarDaysIcon, ListBulletIcon } from '@heroicons/react/24/outline';

export const categories = [
  {
    id: 0,
    name: 'Mi Día',
    category: 'dia',
    icon: SunIcon,
    count: 0,
    added:false
  },
  {
    id: 1,
    name: 'Importante',
    category: 'importante',
    icon: StarIcon,
    count: 0,
    added:false
  },
  {
    id: 2,
    name: 'Planeado',
    category: 'planeado',
    icon: CalendarDaysIcon,
    count: 0,
    added:false
  },
  {
    id: 3,
    name: 'Tareas',
    category: 'tareas',
    icon: ListBulletIcon,
    count: 0,
    added:false
  },
];
