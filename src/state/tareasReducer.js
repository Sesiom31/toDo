import { v4 as uuidv4 } from 'uuid';

export const tareasReducer = (tareas, action) => {
  switch (action.type) {

    case 'CARGAR_TAREAS': {
      return action.tareas;
    }
      
    case 'AGREGAR_TAREA': {
      const newTarea = {
        id: uuidv4(),
        description: action.description,
        completed: false,
        date_start: new Date(),
        date_end: action.date_end || '',
        important: action.important || false,
        categories: ['tareas', ...action.categories],
        pasos: [],
      };
      return [...tareas, newTarea];
    }

    case 'TOGGLE_COMPLETED': {
      return tareas.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t));
    }

    
    case 'TOGGLE_IMPORTANT': {
      return tareas.map((t) => {
        if (t.id === action.id) {
          const nuevasCategorias = new Set(t.categories);

          if (t.important) {
            nuevasCategorias.delete('importante');
          } else {
            nuevasCategorias.add('importante');
          }

          return {
            ...t,
            important: !t.important,
            categories: [...nuevasCategorias],
          };
        } else {
          return t;
        }
      });
    }

    case 'AGREGAR_PASO': {
      const newPaso = {
        id: uuidv4(),
        description: action.description,
        completed: false,
      };
      return tareas.map((t) => (t.id === action.id ? { ...t, pasos: [...t.pasos, newPaso] } : t));
    }

    case 'TOGGLE_COMPLETED_PASO': {
      return tareas.map((t) =>
        t.id === action.id
          ? {
              ...t,
              pasos: t.pasos.map((p) =>
                p.id === action.id_paso ? { ...p, completed: !p.completed } : p
              ),
            }
          : t
      );
    }

    case 'ACTUALIZAR_DESCRIPTION_TAREA': {
      return tareas.map((t) =>
        t.id === action.id ? { ...t, description: action.description } : t
      );
    }

    case 'ELIMINAR_TAREA': {
      return tareas.filter((t) => t.id !== action.id);
    }

    case 'REVERSE_TAREAS': {
      return [...tareas].reverse();
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
