import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Col, Row, Table} from 'react-bootstrap';

function RecentUrl() {
  const [recentURL, setRecentURL] = useState([]);
    useEffect(() => {
      try{
        async function getData(){
          const res = await axios.get(process.env.REACT_APP_RECENT_URL_LINK);
          setRecentURL(res.data);
          console.log(res.data);
        }
        getData();
      }
      catch(err){
        console.log(err)
      }
    }, [])
    
  return (
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
            {recentURL && recentURL.reverse().map((urlData) => (
              <tr key={urlData._id}>
                <td><a href={`http://localhost:3500/${urlData.shortURL}`} target='_blank'  rel="noreferrer">{`http://localhost:3500/${urlData.shortURL}`}</a></td>
                <td>{urlData.fullURL}</td>
                <td>{urlData.count}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>      
  )
}

export default RecentUrl