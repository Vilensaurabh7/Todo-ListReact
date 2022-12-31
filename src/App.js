import React, { useEffect, useState } from "react";
import "./style.css"


// localStorage takes 2 argument(key and value) in string format and returns the data in string format only.
// get data from localStorage..
const getData=()=>{
     const datas=localStorage.getItem("list"); 
     console.log(datas);
     if(datas)
     return JSON.parse(datas);  // string array to array. we can use any of method from both..|
     // return datas.split(",");  // string to array.
     return [];
}

//   JSON.parse(datas)

function App() {


const [val,setVal]=useState(" ");
const [items,setItems]=useState(getData());
const addItem =()=>{
        if(val){
      setItems([...items,val]);
      setVal(" ");  }
    } 

 // adding data in localstorage....   
      // using useEffect hooks...
      useEffect(()=>{
      //  localStorage.setItem("list",items.toString());
//json used to convert array to string array and toString is use to convert direct array to string, we can use any one from both... |
        localStorage.setItem("list",JSON.stringify(items));
      },[items]);


// function for deleting the items from list...

const removeItem=(index)=>{
    var updatedItem=items.filter((element,indNum)=>{
      return indNum!==index;
    })
    setItems(updatedItem);
}
     

// function for edit items...

const editVal=(indexVal)=>{
     items.forEach((eleVal,indVal)=>{
           if(indVal==indexVal){
            setVal(eleVal);
            removeItem(indVal);
           }
     })
}


// function for all delete items...!

const clearAll=()=>{
    setItems([]); 
}
  return (
   <>
     <div className="container">
        <div className="top">
            <div className="main">
                <h1 className="head">todo list</h1>
            </div>
        </div>
        <div className="content">
            <div className="listHead">
                <input type="text" value={val} onChange={(e)=>setVal(e.target.value)} />
                <i className="fa-solid fa-plus" onClick={addItem}></i>
            </div>
           
           
           <div className="repeat">

           { 
           items.map((ele,ind) => {
              return (
                <div className="inner" index={ind}>
                <h2>{ele}</h2>
                <i className="fa-solid fa-pen-to-square" onClick={()=>editVal(ind)}></i>
                <i className="fa-solid fa-trash" onClick={()=>removeItem(ind)}></i></div>
        ) 
              })
              }
     </div> 
        </div>
        <button className="btn" onClick={()=>clearAll()}>clear all</button>
    </div>
   </>
  );
}

export default App;
