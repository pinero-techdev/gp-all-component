export enum FilterOperationType {
  EQUAL = 'EQUAL', // Operación de comparativa de igualdad respecto a un valor
  NOT_EQUAL = 'NOT_EQUAL', // Operación de comparativa de diferencia a un valor
  NULL = 'NULL',  // Operación de comparativa de nulidad del campo
  NOT_NULL = 'NOT_NULL', // Operación de comparativa no nulidad de un campo
  GT = 'GT',  // Operación de comparativa mayor a un valor
  GTE = 'GTE', // Operación de comparativa mayor o igual a un valor
  LT = 'LT', // Operación de comparativa menor a un valor
  LTE = 'LTE',  // Operación de comparativa menor o igual a un valor
  BETWEEN = 'BETWEEN',  // Operación de comparativa campo entre dos valores
  IN = 'IN', // Operación que devuelve los campos que se encuentren entre los valores proporcionados
  NOT_IN = 'NOT_IN', // Operación que devuelve los campos que no se encuentren entre los valores proporcionados
  LIKE = 'LIKE' // Operación que devuelve los campos que contengan la cadena proporcionada
}
