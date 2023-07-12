import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `/api/products/search?keyword=${keyword}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (keyword.length > 0) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Form onSubmit={submitHandler} inline>
      <div ref={searchRef}>
        <Form.Control
          type="text"
          name="q"
          onChange={handleInputChange}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
          style={{ width: 400, color: 'black'}}
          spellCheck="false"
          autoComplete="off"
        ></Form.Control>
        {keyword.length > 0 && (
          <ListGroup
            className="position-absolute mr-sm-2 ml-sm-5 w-15 mt-2"
            style={{ width: 200, zIndex: 100000 }}
          >
            {searchResults &&
              searchResults.map((result) => (
                <ListGroup.Item
                  style={{
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  key={result._id}
                  onClick={() => {
                    // redirect to product page
                    history.push(`/product/${result._id}`);
                  }}
                >
                  {result.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </div>
      <Button
        type="submit"
        variant="outline-light"
        style={{ borderWidth: 1 }}
        className="p-2"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
