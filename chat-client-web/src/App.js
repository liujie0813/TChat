import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
  const [ val, setVal ] = useState()

  useEffect(() => {
    axios.get("http://localhost:18080/test/hello")
        .then(res => {
          setVal(res.data)
        })
        .catch(err => {
            console.log(err);
        })
  })

  return (
    <div>
      <h1>{val}</h1>
    </div>
  );
}

export default App;
