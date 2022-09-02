import React, { useState, useEffect, useInsertionEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea]=useState(""); //dato string
	const [todos, setTodos] = useState([]); //dato array
	
	//esta función es para traer los datos que tenemos en el array en nuestro servidor
	function traertarea(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sergiomerizalde', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then((response) => response.json()) //lo transformamos a json
      	.then((data) => setTodos(data)); // lo guardamos en un objeto {}
	}
	//Podemos ver en la consola el array cuando cargamos
	
	//función asociada a evento, para agregar la nueva tarea del array al darle enter en el keydown
	function agregartarea(e){
		//se trabaja con el parametro e con argumento pasado del evento
		if(e.key == "Enter"){
		//condicional que busca cuando la tecla es enter dentro del objeto de keydown que se llama key donde se ve este dato 
		e.preventDefault()
		// setTarea(e.target.value);
		setTodos([...todos, {label: tarea, done: false}]); //que setTodos agarre lo que hay en todos y le agregue el siguiente objeto a ese array para agregar lo del usuario en el todo list
		setTarea(""); //Hacemos de que luego de agregar la tarea el campo quede vacio para asi tener el inputo del siguiente todo
		}
	}
	
	//useefect para poder incluir el método PUT de nuestro proyecto
	useEffect(() =>{
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
	}, [todos]); //acá especifico que cuando en el todo haya un cambio me corra todo este codigo

	//función de eliminación de tarea cuando usuario escoja
	const borrarTarea = (index) => {
		//filtramos el setTodos, y usamos prevState para ver estado previo de todos que queremos cambiar
		setTodos((prevState) =>
		prevState.filter((item, indexFiltered) => indexFiltered !== index)
		);
		console.log(index);
	};

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">Todo List</h1>
				<form className="container">
					<input
					type="text"
					className="form-control"
					placeholder="Agrega una tarea a tu lista..."
					onChange={(e)=>setTarea(e.target.value)}
					onKeyDown={agregartarea}
					value={tarea}
					/>
				</form>
			<div className="container col-6 text-center">
				<ul> 
				{/* insertamos la lista de tareas debajo de la barra de input que tenemos */}
				{todos.map((item,index)=>{
					return (
						<li key={index}>
							{" "}
						 	{item.label} 
							<span> 
								<button
									type="button"
									className="btn"
									onClick={()=>borrarTarea(index)}
									>
									X 
								</button>	
							</span>
						</li>
					);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
