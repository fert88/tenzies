import React, { useEffect, useState } from "react";
import "./style.scss";
import { nanoid } from 'nanoid';
import Dice from "./Dice";
import Confetti from "react-confetti";
function App() {
  function generateDice(){
    return{
        id:nanoid(),
        value:Math.floor((Math.random() * 6)+1),
        isHeld:false
    }
  }
  function newDice(){
    const dice=[]
    for(let i=0;i<10;i++){
      dice.push(generateDice())    
    }
    return dice
  }
  const [dice,setDice]=useState(newDice())
  const [finish,setFinish]=useState(false)
  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setFinish(true)      
    }
    
  },[dice])
  function updateDice(){
    if(!finish){
      setDice(old=>old.map(dice=>{
        return dice.isHeld ? dice : generateDice()
      }))}
    else{
      setFinish(false)
      setDice(newDice())

    }
  }
  function holdDice(id){
    setDice(old=>old.map(dice=>{
      return dice.id===id?{...dice,isHeld : !dice.isHeld}:dice
    }))
  }
  const diceElements=dice.map(d=>(
    <Dice 
      key = {d.id}
      value ={d.value}
      isHeld = {d.isHeld}
      holdDice = {()=>holdDice(d.id)}
    />
  ))
  return (
    <div className="app">
      <div className="container">
        
        <div className="content">
          
          {finish && <Confetti width={520} height={520} /> }
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button onClick={updateDice}>{finish?"New Game":"Roll"}</button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
