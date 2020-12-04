import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";



function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([])
  const [searchCountry, setSeacrhCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
      ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const filterCountry = results.filter(item => {
    return searchCountry !== "" ? item.country === searchCountry : item;
  });
  const countries = filterCountry.map((data, i) => {
    return (
      <Card
      key={i}
      bg="light"
      text="dark"
      className="text-center"
      style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.Country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's Cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
          
        </Card.Body>
        </Card> 
      );
    });

  return (
    <div>
      <CardDeck>
    <Card 
    bg="secondary" 
    text="white" 
    className="text-center" 
    style={{margin: "10px"}}>

    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>{latest.cases}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small ></small>
    </Card.Footer>
  </Card>
  <Card bg="danger" 
    text={"white"} 
    className="text-center"  
    style={{margin: "10px"}}>
    
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>{latest.deaths}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small></small>
    </Card.Footer>
  </Card>
  <Card bg="success" 
    text={"white"} 
    className="text-center"  
    style={{margin: "10px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>{latest.recovered}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small></small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formBasicSearch">
    <Form.Control 
    type="text" 
    placeholder="search country" 
    onChange={e => setSeacrhCountry(e.target.value)}
    />
    
  </Form.Group>
  </Form>
<CardColumns>{countries}</CardColumns>

</div>
  );
}

export default App;
