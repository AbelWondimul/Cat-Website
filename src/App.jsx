import { useState } from 'react'
import axios from 'axios'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;



function App() {

  const[bansList, setBansList] = useState([])
  let id = '';
  const [inputs, setInputs] = useState({
    origin: '',
    name: '',
    description: '',
    id: '',
    weight: '',
    years: ''
    
  })
  const [img, setImg] = useState({
    url: '',
    width: '',
    height: ''
  });
  const randNum = () => {
    return Math.floor(Math.random() * 67);
  }

  const fetchData = async () => {
    const {data}  = await axios.get(
      `https://api.thecatapi.com/v1/images/${id}?limit=1&breed_ids=beng&api_key=${ACCESS_KEY}`
    )
    console.log(data)
    console.log(data.url)
    setImg((prev) => ({...prev, url: data.url, width: data.width, height: data.height}))
    console.log(img);
  }

  const add = (e) => {
    setBansList([...bansList, e.target.textContent]) 
  }

  return (
    <>
        <h1 className='hd'>Random Cat Image Generator</h1>
      <div className='box mrg'>
        <form className='frm'>
          <button 
            onClick={async (e) => {
              e.preventDefault()
              const {data}  = await axios.get(
                `https://api.thecatapi.com/v1/breeds?limit=100&breed_ids=beng&api_key=${ACCESS_KEY}`
              )
              const rand = randNum();
              id = data[rand].reference_image_id;
              fetchData();
              console.log(randNum());
              console.log(data.length)
              console.log(data)
              console.log(data[0].url)
              setInputs(() => ({ origin: data[rand]?.origin, name: data[rand].name, description: data[rand].description, id: data[rand].reference_image_id, weight: data[rand].weight.metric, years: data[rand].life_span}))
              
              console.log(inputs);
            }}
          >
            Generate
          </button>
        </form>
        <div>
        <h2>Ban List</h2>
        <h3>Select an attribute in the displayed list to ban it</h3>
        {(bansList.length > 0) && bansList.map((attr) => {
            return <button >{attr}</button>
          })
        }
        </div>
        <div className="box">
        
        <h2>Name: {inputs.name}</h2>
        <p> {inputs.description}</p>
        <button onClick={add}> {inputs.weight} Kilogram</button>
        <button onClick={add}> {inputs.origin}</button>
        <button onClick={add}> {inputs.years}</button>
        <div >
        <img className="img" src={img.url} alt="Cat"/>
        </div>
        </div>
        
      </div>
    </>
  )
}


export default App
