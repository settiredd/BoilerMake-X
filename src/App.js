import React, { useState, useEffect } from 'react';
import './App.css';
//timer
import Settings from './Settings';
import Timer from './Timer';
//import {useState} from "react";
import SettingsContext from './SettingsContext';
//timer end
//Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //here, i can write js code and functions
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //timer
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  
  //RUN ONCE WHEN APP STARTS
  useEffect(() => {
    getLocalTodos()
 }, [])
  //USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])
  //functions
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break
    }
  }

  //save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  };
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLoc = JSON.parse(localStorage.getItem('todos'))
      console.log(todoLoc)
      setTodos(todoLoc)
    }
  }

  return (
    
    //<div className="App">
    <main>
      <header>
      <h1>Today's To Dos</h1>
      </header>

      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      />

      <TodoList 
      setTodos={setTodos} 
      todos={todos}
      filteredTodos={filteredTodos}/>

      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
      
    //</div>
  );
};

export default App;
