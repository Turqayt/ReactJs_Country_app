import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import {Container,Form, InputGroup, Table} from 'react-bootstrap';


export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  axios
    .get('https://restcountries.com/v2/all')
    .then(response => setCountries(response.data))
    .catch(error => console.log({ error }));
}, []);
  return(
      <div className="App">
        <Container>
          <h1 className='text-center mt-4'>Country</h1>
        <Form>
          <InputGroup className='my-3'>
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Capital' />
          </InputGroup>
        </Form>
        <Table striped variant="dark">
         <tbody>
                 <tr>
                 <th scope="col">#</th>
                  <th scope="col">Country Name</th>
                  <th scope="col">Capital Name</th>
                  <th scope="col">Flag</th>
                </tr>
               
                {countries.filter((country) => {   
            if(search===""){
              return country;
            }
            else if(country.capital != null){
              if( country.capital.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                return country;
              }
            }
          })
          .map((country,i) => 
              
                  <tr key={i}>
                    <td>{i+1}</td>
                   <td>{country.name}</td>
                   <td>{country.capital}</td>
                   <td><img src={country.flag} alt={country.name} style={{ width: "100px" }} /></td>
                  </tr>  
            
          )}
           </tbody>
          </Table>
          </Container>
      </div>
  );
}
