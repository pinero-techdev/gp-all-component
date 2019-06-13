import { AttachmentOperationEnum } from './attachment-operation.enum';

export class Attachment {
  operation: AttachmentOperationEnum;
  fieldName: string;
  fileName: string;
  mimeType: string;
  content: string;
}
