import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";

function RecentUrl() {
  const [recentURL, setRecentURL] = useState([]);
  const DEBUG = +process.env.REACT_APP_DEBUG;

  //Fetching Last 7 days URL from backend, useEffect will run only once when this component is loaded
  useEffect(() => {
    try {
      async function getData() {
        const res = await axios.get(process.env.REACT_APP_RECENT_URL_LINK);
        setRecentURL(res.data);
        if (DEBUG) console.log(res.data);
      }
      getData();
    } catch (err) {
      if (DEBUG) console.log(err);
    }
  }, []);

  return (
    // Using react bootstrap styling and starting with ROW as it will be shown in home page and container
    // is defined there
    <Row>
      <Col>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Full URL</th>
              <th>No of times clicked</th>
            </tr>
          </thead>
          <tbody>
            {recentURL &&
              recentURL.reverse().map((urlData) => (
                <tr key={urlData._id}>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_SHORTEN_URL_LINK}${urlData.shortURL}`}
                      target="_blank"
                      rel="noreferrer"
                    >{`${process.env.REACT_APP_SHORTEN_URL_LINK}${urlData.shortURL}`}</a>
                  </td>
                  <td>{urlData.fullURL}</td>
                  <td>{urlData.count}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default RecentUrl;
