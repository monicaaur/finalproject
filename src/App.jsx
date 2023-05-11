import { useState, useEffect } from "react";
import Axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  useEffect( async () => {
    await Axios.get("https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=10&page=1", {
      headers: {
        apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b'
      },
    })

    .then((response) => {
      console.log(response);
    })
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
