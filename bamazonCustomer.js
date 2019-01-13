var mysql = require("mysql");
var inquirer = require("inquirer");

const ctable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "marisolgranados",

  password: "dormirte",
  database: "bamazon"
})

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {


  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // display table of products first

    console.table(results);

    // once we show table we must prompt to buy
    inquirer
      .prompt([
        {
          name: "iditem",
          type: "input",
          message: "What is the ID of the product you would like to buy?",
        },
        {
          name: "numunits",
          type: "input",
          message: "How many would you like to buy?",
        }]
      )
      .then(function (answer) {
        console.log("id item test" + results[0].item_id);
        // console.log("id item test2" + answer.iditem);
        // console.log("id item test3" + results[answer.iditem].item_id);

        // console.log("dataset product name test:" + results[0].product_name);
        // console.log("dataset stock quantity test:" + results[0].stock_quantity);
        var newi = answer.iditem - 1;

        console.log("id item test2" + results[newi].item_id);

        // obtain info of item they want to buy
        var itemtobuy;
        for (var i = 0; i < results.length; i++) {
          if (results[newi].item_id == answer.iditem) {
            itemtobuy = results[newi];
          }
          else {
            console.log("The item you requested is not currently available.")
          }
        }

        console.log("item id to buy stock existing:" + itemtobuy.stock_quantity);
        console.log("units requested to buy"+answer.numunits);
        var newstock = itemtobuy.stock_quantity - answer.numunits

        console.log("newstock" + newstock);
        console.log("item id to buy:" + itemtobuy);


        // // check if there is enough product 
        if ((itemtobuy.stock_quantity) > 0) {
          console.log("updating database if statement works");

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newstock
              },
              {
                item_id: itemtobuy.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Final -- Total price:")
              start();
            }
          )
        }
        else {
          // there isn't enough product available
          console.log("We apologize but there isn't enough product.")
          start();
        }
      });
  })
}
