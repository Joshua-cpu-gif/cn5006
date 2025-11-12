import React from "react";
import './App.css';
import { useState } from "react";

function Hook_controllButtonState()
{
    const ClickHandle=() =>
   {
     setCount(count + 1)

}
const [count,setCount] = useState(0);
return (
    <div className="App-header">  
    
<form>

<h1>Click counts are{count}</h1>
<button type ="button" onClick={ClickHandle}>Click me{count}
</button>
 </form>
   </div>
);

}
export default Hook_controllButtonState
