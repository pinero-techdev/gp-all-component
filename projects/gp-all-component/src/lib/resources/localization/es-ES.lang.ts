export const LocaleES = {
  ACCEPT: 'Aceptar',
  ACCESS_URL_FORBIDDEN: (userId, url) =>
    `El username ${userId} no tiene los permisos necesarios para acceder a ${url}`,
  AN_ERROR_HAS_OCURRED: 'Ha ocurrido un error',
  AN_ERROR_LOADING_DATA: 'Error al cargar datos',
  CHANGE_PASSWORD: 'Cambiar clave',
  ENTER: 'Entrar',
  FIELDS_ARE_MANDATORY: 'Todos los campos son obligatorios',
  LOADING_DROPDOWN_DATA: 'Cargando los datos del desplegable ...',
  LOGGED_USER: 'Usuario logado',
  NO_OPTIONS_FOR_SELECTION: 'No existen opciones para el valor seleccionado',
  PASSWORD: 'Password',
  PASSWORD_CORRECTLY_MODIFIED: '¡Contraseña modificada correctamente!',
  PASSWORD_FIELDS_DO_NOT_MATCH: '¡Las contraseñas no coinciden!',
  RETRIEVING_DATA: 'Recuperando datos ...',
  SELECT: 'Seleccione',
  SELECT_WITH_PARAM: (param) => `Seleccione ${param} ...`,
  USERNAME: 'Usuario',
  USERNAME_PASS_SHOULD_CORRECT_VALUE: 'Los campos username y password deben tener un valor válido.',
  USER_HAS_NOT_ASSOCIATED_A_MENU: (userId, app) =>
    `El username ${userId} no tiene menú asociado en la aplicación ${app}`,
  USER_IS_NOT_LOGGED: 'El username no se encuentra logado',
  VALUE_IS_REQUIRED: 'El valor es obligatorio.',
  YOU_MUST_TO_MAKE_SELECTION: 'Primero debe seleccionar ',
  YOU_MUST_SET_RELATED_TABLE: (fieldname) =>
    `No se ha indicado tabla relacionada para obtener los valores del campo ${fieldname}`,
  YOU_MUST_SAVE_BEFORE_MODIFY_VIEW_TRANSLATIONS:
    'Debe guardar primero el registro para poder insertar o visualizar las traducciones.',
  VALIDATION_VALUE_TOO_SHORT: (minLength) =>
    'Valor demasiado corto (longitud mínima ' + minLength + ')',
  VALIDATION_VALUE_TOO_LONG: (maxLength) =>
    'Valor demasiado largo (longitud máxima ' + maxLength + ')',
  VALIDATION_SPACES: `El valor indicado no puede contener espacios. Han sido
                      eliminados. Seleccione guardar otra vez para aceptar los cambios.`,
  VALIDATION_CONTROL_SPACES: `El valor indicado contiene caracteres de control. Han sido
  sustituidos por espacios. Seleccione guardar
  otra vez para aceptar los cambios.`,
  VALIDATION_SPECIAL_CHARACTERS: `El valor indicado contiene caracteres no
  válidos (acentos, eñes ...). Han sido sustituidos por caracteres equivalentes o descartados.
  Seleccione guardar otra vez para aceptar los cambios.`,
  VALIDATION_TIME_FORMAT: `El valor indicado no cumple con un formato
  válido: "hh:mm". Ejemplo  de hora válida: 01:45`,
  CALENDAR: {
    MONTH: {
      JAN: {
        SHORT: 'Ene',
        LONG: 'Enero',
      },
      FEB: {
        SHORT: 'Feb',
        LONG: 'Febrero',
      },
      MAR: {
        SHORT: 'Mar',
        LONG: 'Marzo',
      },
      APR: {
        SHORT: 'Abr',
        LONG: 'Abril',
      },
      MAY: {
        SHORT: 'May',
        LONG: 'Mayo',
      },
      JUN: {
        SHORT: 'Jun',
        LONG: 'Junio',
      },
      JUL: {
        SHORT: 'Jul',
        LONG: 'Julio',
      },
      AGO: {
        SHORT: 'Ago',
        LONG: 'Agosto',
      },
      SEP: {
        SHORT: 'Sep',
        LONG: 'Septiembre',
      },
      OCT: {
        SHORT: 'Oct',
        LONG: 'Octubre',
      },
      NOV: {
        SHORT: 'Nov',
        LONG: 'Noviembre',
      },
      DEC: {
        SHORT: 'Dic',
        LONG: 'Diciembre',
      },
    },
    DAY: {
      MON: {
        SHORT: 'lun',
        LONG: 'lunes',
        MIN: 'L',
      },
      TUE: {
        SHORT: 'mar',
        LONG: 'martes',
        MIN: 'M',
      },
      WED: {
        SHORT: 'mié',
        LONG: 'miércoles',
        MIN: 'X',
      },
      THU: {
        SHORT: 'jue',
        LONG: 'jueves',
        MIN: 'J',
      },
      FRI: {
        SHORT: 'vie',
        LONG: 'viernes',
        MIN: 'V',
      },
      SAT: {
        SHORT: 'sáb',
        LONG: 'sábado',
        MIN: 'S',
      },
      SUN: {
        SHORT: 'dom',
        LONG: 'domingo',
        MIN: 'D',
      },
    },
  },
  CLOSE_TEXT: 'Cerrar',
  PREV_TEXT: '<Ant',
  NEXT_TEXT: 'Sig>',
  TODAY: 'Hoy',
};
