import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [myData, setMyData] = useState([]);

  const clickHundler = () => {
    console.log(count);
    return setCount(count + 1);
  };

  useEffect(() => {
    const url = `https://randomuser.me/api`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.results);
        return setMyData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <button onClick={clickHundler}> {count}</button>
      <br />
      <br />
      <br />

      {myData.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.picture.large} alt="" />
            <p>my name is  {item.name.first}</p>
            <p> I'm a {item.gender}</p>
            <p>my age is  {item.dob.age}</p>
            <p> call me in {item.phone}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
