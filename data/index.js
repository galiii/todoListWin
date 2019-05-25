
const path = require("path"); // path in node_modules
const uuidv4 = require("uuid/v4"); // for random id's
const fs = require("fs"); //file system in node_modules
const lists = require("./lists.json");

/*GET ADD EDIT DELETE IN LIST*/

/*
getList()
I get from ./lists.json the list id himself
need to  check if the id is valied 
*/
function getList(idList) {
    let id = idList.id; // the id that i pull from req from the server side 
    const list = JSON.parse( //i pull from ./list/id.json the list of cards
      fs.readFileSync(path.resolve(__dirname + "/lists/" + id + ".json"), "utf8")
    );
    const parentName = { id: lists[id].title };
    console.log("on DB in getList:");
    console.log("the type of idList",typeof idList,idList);
    console.log("the type of id",typeof id,id);
    console.log("the type of list",typeof list,list);
    console.log("the type of idList",typeof parentName,parentName);
    return { parentName, list };
  }



// ADD LIST
function addList(list) {
    let newId = uuidv4(); //random id
    list.id = newId; //putting it on object list (the id that have been  chosen)
    lists[newId] = list; //
    let data = JSON.stringify(lists, null, 2);
    let cardsData = JSON.stringify({}, null, 2); //an empty object of cards
    fs.writeFileSync(path.resolve(__dirname + "/lists.json"), data);
    fs.writeFileSync(
      path.resolve(__dirname + "/lists/" + newId + ".json"),
      cardsData
    );
    console.log("on DB in addList:");
    console.log("the type of idList",typeof list,list);
    console.log("the type of idList",typeof newId,newId);
    console.log("the type of id",typeof id,id);
    console.log("the type of list",typeof lists[newId] ,lists[newId]);
    console.log("the type of idList",typeof cardsData,cardsData);
    return list;
  }



  //Edit List
 
function editList(idList, newDB) {
    if (lists[idList.id] === undefined) {
      return;
    }
    lists[idList.id] = newDB;
    lists[idList.id].id = idList.id; //the id will stay the same will check it
    let data = JSON.stringify(lists, null, 2); //
    fs.writeFileSync(path.resolve(__dirname + "/lists.json"), data);
    console.log("on DB in editList:")
    console.log("the type of lists[idList.id] ",typeof lists[idList.id] ,lists[idList.id]);
    console.log("the type of newDB",typeof newDB,newDB);
    console.log("the type of lists",typeof lists,lists);
    console.log("the type of idList",typeof data,data);
    return lists;
  }

  module.exports = {
    getList: getList,
    addList: addList,
    editList :editList
  };

/*





// DELETE LIST   
function deleteList(idList) {
  if (lists[idList.id] === undefined) {
    return;
  }
  fs.unlink(path.resolve(__dirname + "/lists/" + idList.id + ".json")); //first delete the json
  delete lists[idList.id];
  let data = JSON.stringify(lists, null, 2);
  fs.writeFileSync(path.resolve(__dirname + "/lists.json"), data);
  return lists;
}



// ADD ITEM 
function addItem(listId, item) {
  let id = listId.id;
  const items = JSON.parse(
    fs.readFileSync(path.resolve(__dirname + "/lists/" + id + ".json"), "utf8")
  );
  let newId = uuidv4(); //getting id for item
  item.itemId = newId;
  items[newId] = item;
  let data = JSON.stringify(items, null, 2);
  fs.writeFileSync(path.resolve(__dirname + "/lists/" + id + ".json"), data); //write
  return item;
}

// DELETE ITEM 
function deleteItem(allIds) {
  if (lists[allIds.id] === undefined) {
    return;
  }
  const items = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname + "/lists/" + allIds.id + ".json"),
      "utf8"
    )
  );

  delete items[allIds.itemId];
  let data = JSON.stringify(items, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname + "/lists/" + allIds.id + ".json"),
    data
  );
  return items;
}

/**
 * IN THE FUTURE editItem
 

module.exports = {
  getList: getList,
  addList: addList,
  deleteList: deleteList,
  editList: editList,
  addItem: addItem,
  deleteItem: deleteItem
};

**/