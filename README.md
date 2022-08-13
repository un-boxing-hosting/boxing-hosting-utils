[![NPM](https://nodei.co/npm/@un-boxing-hosting/boxing-hosting-utils.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@un-boxing-hosting/boxing-hosting-utils)

# un boxing hosting
 https://bots.unboxingman.com API wrapper for Node.js

## Installation
Simply run `npm i @un-boxing-hosting/boxing-hosting-utils` 

## Usage
(Async)
json config 
```json
    "db": {
        "host": "localhost",
        "port": "3306",
        "user": "user",
        "password": "pass",
        "database": "database",
        "table": "table"
    }
```

geting userid list:
```js
const config = require(`./config`);
const util = require('@un-boxing-hosting/boxing-hosting-utils');
//new client for eveything not db
const utils = new util.Client(config.dsapi);
// client for db functions 
const db = new util.db(config.db);
//get a id list that we host to add ids to list requst in support server
const list = utils.getIDList();
//a list of unboxing hosting staff and aray
const stafflist = utils.getStaffList();
//get id list to use
async function getList() {
   const idlist = await list;
}
//get stafflist to use
async function getStaffList() {
   const idlist = await stafflist;
}
//set data in the table if it is in the table update it
db.set(`id`,`this is data`);
//get the data for that id
db.get(`id`);
//delete id and data from the table
db.delete(`id`);

```

## License
[MIT](LICENSE)
