# socket-service


## API
| METHOD | ENDPOINT | BODY | DESCRIPTION |
| --- | --- | --- | --- |
| POST | /api/socket/configuration | | Emits an event to all the connected users, in order to fetch the page again |
| POST | /api/socket/folders | { users: [id, id, id], folders: [id, id] } | Emits an event to the the users that are connected to the received room (userIDs, folderIDs) |
 
 ### userIDs
 Is an array of all the users that where shared.
 
 ### folderIDs 
 Is an array of all the folders that a change appeared in them (like new user, new filde, deleted file...)


 ## SOCKET

 ### events
 | EVENTS | NAMESPACE | ROOM |
| --- | --- | --- |
| refresh | /configuration | default |
| refresh | /folder | folderId |
| refresh | /shared-folders | userId |

 ### subscribes
 | ON | NAMESPACE | ROOM | DATA
| --- | --- | --- | --- |
| joinRoom | /folder | folderId | folderId |
| joinRoom | /shared-folders | userId | userId |