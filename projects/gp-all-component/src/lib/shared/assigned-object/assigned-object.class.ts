/**
 * AssignedObject
 *
 * An helper class to help to cast Json / any objects into a "proper" object
 *
 */

export class AssignedObject {
  /**
   * Assign properties to the object passed by param.
   * @param object
   * @param forceAssign
   */
  assign(object: any, forceAssign = false) {
    const paramsToDelete = [];
    if (!forceAssign) {
      for (const param in object) {
        if (object.hasOwnProperty(param) && !this.hasOwnProperty(param)) {
          paramsToDelete.push(param);
        }
      }
    }
    Object.assign(this, object);
    for (const param of paramsToDelete) {
      delete this[param];
    }
    return this;
  }
}
