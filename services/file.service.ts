import {Injectable} from "@angular/core";

@Injectable()
export class FileService {
    downloadFile(file) {
        let byteCharacters = atob(file.file.split(',')[1]);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += 512) {
            var slice = byteCharacters.slice(offset, offset + 512);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        //llamar a getFileContent para recuperar el contenido del file (no vendra con el item)

        var blob = new Blob(byteArrays, {type: file.mimetype});
        var FileSaver = require('file-saver');
        FileSaver.saveAs(blob, file.name);
    }

    getFileContent(item, column) {
        //hacer la llamada a back para recibir el contenido de un file
        //el body sera un stringify de item 'jsonRowToSelect' y el nombre de la columna que contiene el file
    }

    insertRow(originalRow, modifiedRow, attachments) {
        // El parámetro attachments es un array con las operaciones a realizar concada fichero.
        // En cada entrada de la tabla se informa el nombre del campo (fieldName), la operación (MODIFY / DELETE) y el contenido en caso de MODIFY
    }

}