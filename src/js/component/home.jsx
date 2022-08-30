import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);

	function actualizar(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sergiomerizalde', {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}
	function traerdatos(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sergiomerizalde', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then((response) => response.json()) //lo transformamos a json
      	.then((data) => setTodos(data)); // lo guardamos en un objeto {}
	}
	function creartodo(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sergiomerizalde', {
		method: "POST",	
  		"Content-Type": "application/json",
  		BODY: [],
		)};
	}
	useEffect(() => {
		//el bloque de codigo que quiero que se ejecute
		traerdatos();
	  }, []);
	  console.log(todos);
	return (
		<div className="text-center">
			{/* <h1 className="text-center mt-5">Todo List</h1>
			<form className="container" onSubmit={meterdatos}>
			<input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Tu correo aquí"
			onChange={(e)=>setTodos(e.target.value)}
			value={todos}
          	/>
			</form>
			<div>
				{todos.map((item,index)=><li key={index}> {item} <span onClick={()=>borrar(item)}>  X </span></li>)}
			</div> */}
		</div>
	);
};

export default Home;
