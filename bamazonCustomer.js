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


  connection.query("SELECT * FROM bamazon.products", function (err, results) {
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
        // obtain info of item they want to buy
        var itemtobuy;

        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.iditem) {
            itemtobuy = results[i];
          }
        }

        // check if there is enough product 
        if (itemtobuy.stock_quantity > 0) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: stock_quantity - answer.numunits
              },
              {
                item_id: itemtobuy
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Successfully bought item!");
            }
          )
        }
        else {
          // there isn't enough product available
          console.log("We apologize but there isn't enough product.")
        }
      });
  })
}
