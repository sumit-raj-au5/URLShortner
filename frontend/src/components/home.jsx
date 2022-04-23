import React, { useState } from "react";
// For navigation
import { useNavigate } from "react-router-dom";
import RecentUrl from "./RecentUrl";
import ShortnerImg from "../../src/shortner.png";
// Bootstrap for styling
import { Col, Container, Row } from "react-bootstrap";
// Validator node module for validating URL and if value is empty
import { isEmpty, isURL } from "validator";

function Home() {
  // Stated to keep track of input URL, error and if user wants to see recent url
  // Also to store error msg and full URL
  const [inputURL, setInputURL] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recentClicked, setRecentClicked] = useState(false);
  const [fullURL, setFullURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const DEBUG = +process.env.REACT_APP_DEBUG;
  // to use navigate hook
  let navigate = useNavigate();

  //this function will shorten long url into small one
  async function shortenURL(e) {
    e.preventDefault();
    //when shorten url is clicked, hide Recent URLs
    setRecentClicked(false);
    //if input value is empty or is not a valid URL then it will show error msg
    //URL is validated using validator
    if (isEmpty(inputURL) || !isURL(inputURL)) {
      setErrorMsg("Please enter a valid URL");
      setError(true);
      return null;
    }
    //if value entered is valid URL then send post request to backend with full URL
    try {
      const res = await fetch(process.env.REACT_APP_SHORTEN_URL_LINK, {
        method: "POST",
        body: JSON.stringify({ fullURL: inputURL.toLowerCase() }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("token"),
        },
      });
      //after post request waiting for a response
      const data = await res.json();
      if (DEBUG) console.log(data);
      //if error response is received then user is sent to login page as user should be logged in to make use this service
      if (data.error) {
        navigate("./login", { replace: true });
      }
      //if response has data with shortURL then error is cleared and shortURL state is set
      if (data.shortURL) {
        setError(false);
        setErrorMsg("");
        setShortURL(data.shortURL);
        if (DEBUG) console.log(data.shortURL);
      }
      //if response has data with shortURL then error is cleared and FullURL state is set
      //this means this url had already been shorten before
      if (data.fullURL) {
        setError(false);
        setErrorMsg("");
        setFullURL(data.shortURL);
        if (DEBUG) console.log(data.shortURL);
      }
    } catch (err) {
      if (DEBUG) console.log(err);
      navigate("../signin", { replace: true });
    }
  }

  //for toggling recent click view
  async function handleRecentClick() {
    setInputURL('');
    setShortURL('');
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
              {/* input field to receive url from user */}
              <input
                type="text"
                name="inputURL"
                onChange={(e) => setInputURL(e.target.value)}
                value={inputURL}
                placeholder="Enter a url to short"
              />
              {/* displaying differnt data based on conditions */}
              {error && errorMsg && <div className="error">{errorMsg}</div>}
              {shortURL && (
                <div className="success">Short URL:- {shortURL}</div>
              )}
              {fullURL && <div className="success">Full URL:- {fullURL}</div>}
              {/* Submit button to trigger shortURL function */}
              <button onClick={shortenURL} className="btn">
                Short Now
              </button>

              {/* <button className="btn">Unlock Now</button> */}
              {/* Button to toggle recent URL view */}
              <button onClick={handleRecentClick} className="btn">
                {recentClicked ? "Hide " : "Show "}Recent URLs
              </button>
            </div>
          </header>
        </Col>
      </Row>
      {/* If recent view is true then RecentUrl component is shown */}
      {recentClicked && <RecentUrl />}
    </Container>
  );
}

export default Home;
