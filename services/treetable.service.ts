/** @author 3digits */
/** La creación de un servicio ha sido valorada como la más conveniente para este caso. */

import { Injectable } from '@angular/core';
import { GpFormFieldDetail } from 'gp-all-component/components/tables/gp-app-table-crud-shared';
import { TreeNode } from 'primeng/api';

@Injectable()
export class TreeTableService {
  tratarTreeTable(data: any, columnasDetail: GpFormFieldDetail[]): TreeNode[] {
    // data es un array que contiene los padres.

    let elementosDetail: TreeNode[] = [];

    data.forEach(dato => {
      elementosDetail.push(this.tratarNodo(dato, columnasDetail));
    });

    return elementosDetail;
  }

  insertarNodo(elementosDetail: TreeNode[], nodo: any, columnasDetail: GpFormFieldDetail[], children?: TreeNode[]): TreeNode[] {
    // para que sea completamente genérico, así los nombres de los campos del objeto coinciden con los fieldNames de metadata.
    let insertado: TreeNode = children ? this.transformarDataNodo(nodo, columnasDetail, children) : this.transformarDataNodo(nodo, columnasDetail);
    let atributoId: string = this.obtenerAtributoId(columnasDetail);
    let atributoPadreId: string = this.obtenerAtributoPadreId(atributoId, columnasDetail);

    if (nodo[atributoPadreId]) {
      // encontrar el padre al cual insertar el registro
      let padre = this.encontrarPadreNodo(elementosDetail, nodo, atributoId, atributoPadreId);

      if ((padre && !padre.children) || (padre && padre.children && padre.children.length < 1)) {
        padre.children = [];
      }
      padre.children.push(insertado);
    } else {
      // si no tiene hay que insertarlo al elementosDetail directamente
      elementosDetail.push(insertado);
    }

    return elementosDetail;
  }

  eliminarNodo(elementosDetail: TreeNode[], nodo: any, columnasDetail: GpFormFieldDetail[]): TreeNode[] {
    // tiene padre?
    // si -> quitarlo de la lista del padre -> eliminarlo
    // no -> eliminarlo
    // devolver la lista de hijos que tiene

    let eliminado: TreeNode = this.transformarDataNodo(nodo, columnasDetail);
    let atributoId: string = this.obtenerAtributoId(columnasDetail);
    let atributoPadreId: string = this.obtenerAtributoPadreId(atributoId, columnasDetail);

    // encontrar el padre del cual quitar el registro
    let itself: TreeNode;
    if (nodo[atributoPadreId]) {
      let padre = this.encontrarPadreNodo(elementosDetail, nodo, atributoId, atributoPadreId);

      if (padre && padre.children && padre.children.length > 0) {
        itself = padre.children.find((child: TreeNode) => child.data[atributoId] == eliminado.data[atributoId]);
        const index: number = padre.children.indexOf(itself);
        if (itself) {
          padre.children.splice(index, 1);
        }
      }
    } else {
      itself = elementosDetail.find((child: TreeNode) => child.data[atributoId] == eliminado.data[atributoId]);
      const index = elementosDetail.indexOf(itself, 0);
      if (index > -1) {
        elementosDetail.splice(index, 1);
      }
    }
    return itself.children;
  }

  obtenerAtributoId(columnasDetail: GpFormFieldDetail[]): string {
    let atributoId: string;

    columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      if (columnaDetail.fieldMetadata.id) {
        atributoId = 'codigoValorPreformulario';
      }
    });

    return atributoId;
  }

  /***********************************************************************************************************************/
  /*********************************************          PRIVATE ZONE           *****************************************/
  /***********************************************************************************************************************/

  private transformarDataNodo(nodo: any, columnasDetail: GpFormFieldDetail[], children?: TreeNode[]): TreeNode {
    let treeNode: TreeNode = { data: {} };

    columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      treeNode.data[columnaDetail.fieldMetadata.fieldName] = nodo[columnaDetail.fieldMetadata.fieldName];
    });

    if (children) treeNode.children = children;

    return treeNode;
  }
  private tratarNodo(nodo: any, columnasDetail: GpFormFieldDetail[]): TreeNode {
    let dataObject: {} = {};

    // para que sea completamente genérico, así los nombres de los campos del objeto coinciden con los fieldNames de metadata.
    columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      dataObject[columnaDetail.fieldMetadata.fieldName] = nodo[columnaDetail.fieldMetadata.fieldName];
    });

    let elemento: TreeNode = {
      data: dataObject
    };

    if (nodo.listaChildren && nodo.listaChildren.length > 0) {
      elemento.children = [];

      // recursividad para tratar a los hijos
      nodo.listaChildren.forEach(child => elemento.children.push(this.tratarNodo(child, columnasDetail)));
    }

    return elemento;
  }

  private encontrarPadreNodo(nodosNivel: TreeNode[], nodo: any, atributoId: string, atributoPadreId: string): TreeNode {
    let padre: TreeNode = nodosNivel.find((elemento: TreeNode) => elemento.data[atributoId] == nodo[atributoPadreId]);

    if (!padre) {
      nodosNivel.forEach((nivel: TreeNode) => {
        if (!padre && nivel.children && nivel.children.length > 0) {
          padre = this.encontrarPadreNodo(nivel.children, nodo, atributoId, atributoPadreId);
        }
      });
    }

    return padre;
  }

  private obtenerAtributoPadreId(atributoId: string, columnasDetail: GpFormFieldDetail[]): string {
    let atributoPadreId: string;

    // obtener el atributo que contiene el código del padre
    columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      if (columnaDetail.fieldMetadata.displayInfo && columnaDetail.fieldMetadata.displayInfo.referencedField == atributoId) {
        atributoPadreId = columnaDetail.fieldMetadata.fieldName;
      }
    });

    return atributoPadreId;
  }
}
