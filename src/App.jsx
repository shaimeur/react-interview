import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [myData, setMyData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  const clickHundler = () => {
    console.log(count);
    return setCount(count + 1);
  };

  const url = `https://randomuser.me/api`;

  const fetchUserData = async (page) => {
    try {
      const res = await fetch(`${url}?page=${page}&results=10`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data.results);
      return data.results;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData(currentPage).then((randomData) => {
      setMyData(randomData);
    });
  }, [currentPage]);

  const handleNextPage = () =>{
    return setCurrentPage(currentPage + 1 );
  }

  const handlePrevPage = () =>{
    if(currentPage > 1){

      return setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="App">
      <button onClick={clickHundler}> {count}</button>
      <br />
      <br />
      <br />
      <p>the JSON Object in string format using JSON.stringify  </p>
      {/* {JSON.stringify(myData)} */}

      <br />
      <br />
      <br />
      <br />
      {myData.map((item) => (
        <div key={item.login.uuid}>
          <img src={item.picture.large} alt="" />
          <p>Hi!  my name is {item.name.first} I'm {item.dob.age} </p>
          <p>I live  {item.location.city} {item.location.country} </p>
          <p>you can call me in my cell phone {item.phone}</p>

        </div>
      ))}
      <button onClick={handlePrevPage}>Prev page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}
export default App;
