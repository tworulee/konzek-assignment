import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import CardMain from "./components/CardMain";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CardGroup, Container, Navbar, Pagination } from "react-bootstrap";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      emoji
      currency
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const [filterText, setFilterText] = useState(""); // State for filter text
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  // Filter function
  const filteredCountries = data.countries.filter((country) =>
    country.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value); 
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Navbar className="bg-body-tertiary justify-content-center m-3">
        <Form className="flex justify-content-center">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={filterText}
                onChange={handleFilterTextChange} // Update filter text
              />
            </Col>
          </Row>
        </Form>
      </Navbar>

      <CardGroup className="bg-body-tertiary justify-content-center">
        <Row className="justify-content-center m-4">
          {currentCountries.map((country) => (
            <Col key={country.code} className="col-sm-6 col-md-6 col-lg-4 mb-3">
              <CardMain
                value={country.code}
                country={country}
                id={country.code}
              />
            </Col>
          ))}
        </Row>
      </CardGroup>

      <Pagination className="justify-content-center">
        {currentPage > 1 && (
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
        )}

        {Array.from(
          { length: Math.ceil(filteredCountries.length / countriesPerPage) },
          (_, index) => {
            if (index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2) {
              return (
                <Pagination.Item
                  key={index + 1}
                  onClick={() => {
                    paginate(index + 1);
                  }}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </Pagination.Item>
              );
            }
            return null;
          }
        )}

        {currentPage <
          Math.ceil(filteredCountries.length / countriesPerPage) && (
          <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        )}
      </Pagination>
    </Container>
  );
}

export default App;
