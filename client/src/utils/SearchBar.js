import { useState, Fragment } from "react";
import { Container } from "react-bootstrap";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useMessageState, useMessageDispatch } from '../context/message'

export default function SearchBar () {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch()
  const [options, setOptions] = useState([]);

  const handleSearch = (searchKey, data=users) => {

    const options =  data.filter(user => {
      return user.username.includes(searchKey)
    })

    setOptions(options)
  }

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  
  return (
    <AsyncTypeahead
      filterBy={filterBy}
      isLoading={false}
      id="search-bar"
      labelKey="username"
      minLength={3}
      className='m-3'
      delay={800}
      emptyLabel="No matching people or spaces."
      ignoreDiacritics={true}
      placeholder="Search user..."
      promptText="Searching"
      searchText="Searching"
      onSearch={handleSearch}
      options={options}
      renderMenuItemChildren={(option, _) => (
        <Fragment>
          <Container onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: option.username }) }>
          <img
          alt=''
            src={option.imageURL || 'https://www.gravatar.com/avatar?d=mp&f=y'}
            style={{
              height: '35px',
              marginRight: '10px',
              width: '35px',
            }}
          />
          <span>{option.username}</span>
          </Container>
        </Fragment>
      )}
    />
  );
};
