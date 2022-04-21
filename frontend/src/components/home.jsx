import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import RecentUrl from "./RecentUrl";
import ShortnerImg from "../../src/shortner.png";
import { Col, Container, Row } from "react-bootstrap";
import {isEmpty, isURL} from 'validator';

function Home() {
  const [inputURL, setInputURL] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recentClicked, setRecentClicked] = useState(false);
  const [fullURL, setFullURL] = useState("");

  let navigate = useNavigate();

  async function shortenURL(e){
    e.preventDefault();
    setRecentClicked(false);
    if(isEmpty(inputURL) || !isURL(inputURL)){
      setErrorMsg("Please enter a valid URL");
      setError(true);
      return null;
    }
    try {
      const res = await fetch(process.env.REACT_APP_SHORTEN_URL_LINK, {
        method: "POST",
        body: JSON.stringify({ fullURL: inputURL.toLowerCase() }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem('token')
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        navigate("./login", { replace: true });
      }
      if (data.shortURL) {
        setError(false);
        setErrorMsg('');
        setFullURL(data.shortURL)
        console.log(data.shortURL);
      }
      if (data.fullURL) {
        setError(false);
        setErrorMsg('');
        setFullURL(data.shortURL)
        console.log(data.shortURL);
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
    //till this point
    <Container>
      <Row>
        <Col>
        <header>
        <div className="smoothie">
          <img src={ShortnerImg} alt="link Shortner" />
        </div>
        <div className="headings">
          
          <input
            type="text"
            name="inputURL"
            onChange={(e) => setInputURL(e.target.value)}
            value={inputURL}
            placeholder="Enter a url to short"
          />
          {error && errorMsg && <div className="error">{errorMsg}</div>}
          {fullURL && <div className="success">{fullURL}</div>}
          <button onClick={shortenURL} className="btn">
            Short Now
          </button>

          {/* <button className="btn">Unlock Now</button> */}

          <button
            onClick={handleRecentClick}
            className="btn"
          >
            {recentClicked?"Hide ":"Show "}Recent URLs
          </button>
          
          </div>
          </header>
        </Col>
      </Row>
      {recentClicked && <RecentUrl/>}
    </Container>
      
          
  );
}

export default Home;
