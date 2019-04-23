'use strict';

(function() {
	let default_query = "SELECT m.id, m.name, m.year FROM actors a " + 
						"JOIN roles r ON a.id=r.actor_id " + 
						"JOIN movies m ON m.id=r.movie_id " + 
						"WHERE a.first_name='Kevin' AND a.last_name='Spacey' " + 
						"ORDER BY m.year";
	window.onload = function(){
		document.getElementById('queryBtn').onclick = queryDb;
	}

	/** Query info from the database according to user's query command
	  */
	function queryDb () {
		let command = document.getElementById('queryTxt').value;
		// default cmd
		command = default_query;
		//if(command.length < 1) command = default_query;

		let url = "http://csc-337-fall2019-heroku-test.herokuapp.com" + process.env.PORT + "?query=" + command;
		
		/*----------fetch-----------*/
		fetch(url)
			.then(checkStatus)
			.then(function(responseText) {
				makeTable(JSON.parse(responseText));
			})
			.catch(function(error) {
				console.log(error);
			});

	}
	/** Make table displaying fetched data
	  */
	function makeTable(info) {
		let tableDiv = document.getElementById("table");
		let table = document.createElement("table");
		let properties = document.createElement("tr");

		tableDiv.innerHTML = "";
		
		/*-------------Generate properties-------------*/
		for(let prop in info[0]) {
			let item = document.createElement("th");
			item.innerHTML = prop;
			properties.appendChild(item);
		}
		/*------------------first row-------------------*/
		table.appendChild(properties);

		/*--------------following rows-----------------*/
		for (let i = 0; i < info.length; i++) {
			let data = document.createElement("tr");
			// individual data
			for(let key in info[i]) {
				let item = document.createElement("td");
				item.innerHTML = info[i][key];
				data.appendChild(item);
			}
			// append rows
			table.appendChild(data);
		}
		// display table
		tableDiv.appendChild(table);
		
	}

	function checkStatus(response) {  
	    if (response.status >= 200 && response.status < 300) {  
	        return response.text();
	    } else if (response.status == 404) {
	    	// sends back a different error when we have a 404 than when we have
	    	// a different error
	    	return Promise.reject(new Error("Sorry, we couldn't find that page")); 
	    } else {  
	        return Promise.reject(new Error(response.status+": "+response.statusText)); 
	    } 
	}
}
)();