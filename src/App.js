import { useState, useEffect } from "react"

import './App.css'

const URL = "https://api.giphy.com/v1/gifs/search"
const API_KEY ="YgWsLqFbywQmXF77jWLGzrCxAOjyN0vQ"

function App(){

  const [data, setData] = useState([])
  const [query, setQuery] = useState('')  

  const handleSubmit = () => {
    if (!query) {
      setData(undefined);
      return;
    }

    fetch(`${URL}?api_key=${API_KEY}&q=${query}&format=json`)
    .then(response => response.json())
      .then(json => {
        setData(json.data);
      })
    .catch((e)=> {
      console.log("error finding GIF doesnt exists",e)
    })
  }

  //console.log("data",data)
    useEffect(()=> {
      handleSubmit()
    },[])


    return (
      <div className="App">
      <form onSubmit={e=> {
        e.preventDefault();
        handleSubmit();
      }}
        >
      <div style={{paddingBottom:"20px", color:"blue"}}><b>Search GIPHYs </b></div>
      <input
        type="text"
        value={query}
        onChange={(e) =>setQuery(e.target.value)}
      />
      <button type="submit" className="button">Search</button>
      </form>
      {data && (
        <div>  
        <h2> Results </h2>
        <ul>
            {data.map(d => {
              return (<li className="li" key={d.id}>
                        <img src={d.images.fixed_width.url}  alt="c1"/>
                      </li>)
            })}   
        </ul>     
        </div>
        )

      }
      </div>
    )
}

export default App