# CatlionDB
## _Written by CatLion (Alexa)_

CatlionDB is a customizable JSON database engine made to be easy to use.
**CatlionDB Features at a glance:**
- Internel DB option
- Ability to destroy databases
- Ability to change database file path
- Colored console text :o

## _Documentation:_
### Code Sample
```js
const CatlionDB = require("CatLionDB")
const DB = new CatlionDB.JSONDB("./Database.json");

DB.value = {"Key1":"Value1"}
DB.value["ExampleArray"] = [{"Name":"Alexa"}, {"Favorite Color":"Pink"}]
DB.write().then(Result => {
    console.log(Result)
}).catch(Error => {
    console.log(Error)
})
```

## Functions

#### _Initalize Database_
`new CatlionDB.JSONDB(file,[options]);`

- `file` [**<String>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) *Path where the database JSON file is located or will be created.*
- `options` [**<Json>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) *Json object containing options listed below.*
    - `DEBUG_INFO` [**<Boolean>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) *Enable or disable extra info in console.*
    - `INTERNAL_DB` [**<Boolean>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) *Enable internal database. Database will be stored in CatlionDB's node_modules folder.*

#### _Set database Value_
`#value = [Json Object]`
- `Json Object` [**<Json>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) *The data to be written to database. This is a regular JSON Object so you can use all the supported methods of JSON manipulation on it.*

#### _Write to database_
`#write()`
- *Retrurns a promise which resolves on successful write and rejects on error. Details are always returned in the resolve/reject.*
#### _Destroy Database_
`#destroy()`
- *Retrurns a promise which resolves on successful destruction and rejects on error. Details are always returned in the resolve/reject. You can create the database again with `#setFile()`*
#### _Set database file_
`#setFile(path, [options])`
- *Retrurns a promise which resolves on successful set and rejects on error. Details are always returned in the resolve/reject.*
- `file` [**<String>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) *Path where the database JSON file is located or will be created.*
- `options` [**<Boolean>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) *This option is `INTERNAL_DB`. Weather to create the database internally or not Setting this value will set the value the same way it would be set when you first ilitalize the database. You will need to unset it to turn it off.*


