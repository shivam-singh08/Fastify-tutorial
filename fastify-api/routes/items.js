//with a separate file for route we can register it as plugins
//we create a function
const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require("../controller/item.controller");

//item schema

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

//Options for get all items

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

const updatetItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

function itemRoutes(fastify, options, done) {
  //get all the items
  fastify.get("/items", getItemsOpts);

  //get single item based on id
  fastify.get("/items/:id", getItemOpts);

  // add new item in the list
  fastify.post("/items", postItemOpts);

  // delete item in the list
  fastify.delete("/items/:id", deleteItemOpts);

  // update item in the list
  fastify.put("/items/:id", updatetItemOpts);

  done();
}

module.exports = itemRoutes;
