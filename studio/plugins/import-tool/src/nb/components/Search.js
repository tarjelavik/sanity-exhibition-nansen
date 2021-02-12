import React, {useState} from 'react'
import Input from 'part:@sanity/components/textinputs/default'
import Button from 'part:@sanity/components/buttons/default'

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
  }

  const callSearchFunction = (e) => {
    e.preventDefault()
    props.search(searchValue)
  }

  return (
    <form>
      <Input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        isClearable
        onClear={() => handleClear('')}
      />
      <Button style={{marginTop: '0.5em'}} onClick={callSearchFunction} type="submit">
        Søk
      </Button>
    </form>
  )
}

export default Search
