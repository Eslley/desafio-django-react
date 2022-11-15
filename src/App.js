import { useEffect } from "react";
import usersServices from "./providers/http-service/usersServices";

function App() {

  useEffect(() => {
    usersServices.listar()
      .then(res => {
        console.log(res)
      })
      .catch(err =>  console.log(err))
  }, [])

  return (
    <h1>Hello</h1>
  );
}

export default App;
