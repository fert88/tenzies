import React from 'react'

export default function Dice(props) {
  return (
    <div className={"dice "+(props.isHeld && "hold")} onClick={props.holdDice}>
      {props.value}
    </div>
  )
}
