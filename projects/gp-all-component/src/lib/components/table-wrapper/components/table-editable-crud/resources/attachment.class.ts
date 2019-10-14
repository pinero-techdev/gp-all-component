import { AttachmentOperationEnum } from './attachment-operation.enum';
import { AssignedObject } from '../../../../../shared/assigned-object/assigned-object.class';

export class Attachment extends AssignedObject {
  operation: AttachmentOperationEnum = null;
  fieldName: string = null;
  fileName: string = null;
  mimeType: string = null;
  content: string = null;
}
