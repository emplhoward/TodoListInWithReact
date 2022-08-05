import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList'
import { useState, useRef, useEffect } from 'react';

function App() {
  /*
    The useState function is a built in hook that can be imported 
    from the react package. It allows you to add state to your 
    functional components. Using the useState hook inside a function 
    component, you can create a piece of state without switching 
    to class components.
  */

  // tasks contain array in useState()
  // setTasks manipulate tasks.
  const [tasks, setTasks] = useState([]) 
  const taskNameRef = useRef()

  function addTodo(e) {
    const name = taskNameRef.current.value
    if (name === '') {
      return
    }

    setTasks(prevTodos => { //setFunction and prevFunction are React lib functions.           
      //console.log("Setting todos" + prevTodos)
      
      var max = 9999
      var min = 0
      var i =  Math.floor(Math.random() * (max - min + 1)) + min
      return [...prevTodos, {id: i, name: name, complete: false}]
    })  

    taskNameRef.current.value = null
  }

  function updateTasks(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
  }

  // Load saved tasks.
  useEffect(() => { 
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    //console.log("Load 1" + storedTasks)

    if(storedTasks) {
      
      setTasks(storedTasks)

      //console.log("Load 2" + (storedTasks))
    }
  }, []) // Run function useEffect once, with an empty array that doesn't change.

  // Save tasks before load.
  useEffect(() => { 
    //console.log("Saved 1" + JSON.stringify(tasks)) 
    
    localStorage.setItem("tasks", JSON.stringify(tasks)) 

    //console.log("Saved 2" + JSON.stringify(tasks))  
  }, [tasks]) // Run function useEffect to save page, anytime tasks change.

  function clearCompletedTasks() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  return (
      <>
          <p>
            React Tutorial
          </p>      
  
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            To do list:
          </p>  

          <p>
            Number of tasks: {tasks.length}
          </p> 

          <p>
            Tasks left: {tasks.filter(task => !task.complete).length}
          </p> 
 
          <TodoList doList={tasks} updateTasks={updateTasks}/> 

          <input ref={taskNameRef} type="text" />

          <button onClick={addTodo}> Add Task </button>

          <button onClick={clearCompletedTasks}> Clear Completed Tasks </button>
      </>
  );
}

export default App;
