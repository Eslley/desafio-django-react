import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/usuarios/', {
      name: "teste",       //sending data to backend
      description: "teste"
    })
      .then(response => {
        console.log(response.data)    // view the response
      })
      .catch(error => {
        console.log(error)            // check if any error
      })
  }, [])

  return (
    <h1>Hello</h1>
  );
}

export default App;
