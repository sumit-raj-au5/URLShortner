import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {Table} from 'react-bootstrap';

import ShortnerImg from "../../src/shortner.png";
function Home() {
  const [inputURL, setInputURL] = useState("");
  const [error, setError] = useState(false);
  const [recentClicked, setRecentClicked] = useState(false);
  let navigate = useNavigate();

  async function shortenURL(e){
    e.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_SHORTEN_URL_LINK, {
        method: "POST",
        body: JSON.stringify({ fullURL: inputURL }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem('token')
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setError(true);
        navigate("./login", { replace: true });
      }
      if (data.user) {
        console.log(data.user);
      }
    } catch (err) {
      console.log(err);
      navigate("../signin", { replace: true });
    }
  };

  async function handleRecentClick(){
    setRecentClicked(!recentClicked);
  }

  return (
    <div>
      <header>
        <div className="smoothie">
          <img src={ShortnerImg} alt="link Shortner" />
        </div>
        <div className="headings">
          <h2>URL Shortner</h2>
          <input
            type="text"
            name="inputURL"
            onChange={(e) => setInputURL(e.target.value)}
            value={inputURL}
          />
          <button onClick={shortenURL} className="btn">
            Short Now
          </button>
          <button className="btn">Unlock Now</button>
          <button
            onClick={handleRecentClick}
            className="btn"
          >
            {recentClicked?"Hide ":"Show "}Recent URLs
          </button>
          {
        recentClicked && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>No of times clicked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        )
      }
        </div>
        
      </header>
      
    </div>
  );
}

export default Home;
