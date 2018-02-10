var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "",
	database: 'bamazonDB'
});

connection.connect(function(err){
	if(err) throw err;
	displayInventory();
});

function displayInventory(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++){
			console.log(
				'\n' +
				"Id: " + res[i].item_id + ' | ' +
				"Product: " + res[i].product_name + ' |' +
				"Department: " + res[i].department_name + ' | ' +
				"Price: " + res[i].price + ' | ' +
				"Stock: " + res[i].stock_quantity + '\n'
			);
		}
		purchaseItems();
	});
}

function purchaseItems(){
	inquirer.prompt([
	{
		name: 'id',
		type: 'input',
		message: 'Please enter the ID of the product you would wish to purchase.',
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	},
	{
		name: 'count',
		type: 'input',
		message: 'How many would you like?',
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	}
	]).then(function(ans){
		var query = "SELECT * FROM products WHERE item_id = ?";
		connection.query(query, ans.id, function(err, res){
			if(res[0].stock_quantity >= ans.count){
				var cost = res[0].price * ans.count;
				var newStock = res[0].stock_quantity - ans.count;

				query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
				connection.query(query, [newStock, ans.id], function(err, res){
					if (err) throw err;
					console.log("Items purchased for " + cost);
					displayInventory();
				})
			} else {
				console.log("Insufficient quantiy!");
				displayInventory();
			}
		});
	});
}