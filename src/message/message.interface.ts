export interface IMessage {
  operation: OPERATION;
  objectType: OBJECTTYPE;
  fileID: string;
  folderID: string;
  userIDs: string[];
}

export enum OBJECTTYPE {
  FILE = 'FILE',
  PERMISSION = 'PERMISSION'
}

enum OPERATION {
    ADD = 'ADD',
    UPDATE = 'UPDATE',
    DELETE= 'DELETE',
}
