import React from 'react'
import PropTypes from 'prop-types'
import { BiSearch } from 'react-icons/bi'
import '../styles/searchBar.css'
import { Project } from '../interfaces/projectInterface'

function SearchBar ({ projects, setSearchResult }: { projects: Project[], setSearchResult: Function }) {
  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function handleSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return setSearchResult(projects)

    const resultsArray = projects.filter(project =>
      project.tags.includes(e.target.value) || project.title.toLowerCase().includes(e.target.value))

    setSearchResult(resultsArray)
  }

  return (
    <header>
      <form className='searchBar' onSubmit={handleSubmit}>
        <input
          className='searchInput'
          type='text'
          id='search'
          placeholder='Search...'
          onChange={handleSearchChange}></input>
          <span className='searchButton'><BiSearch/></span>
      </form>
    </header>
  )
}

SearchBar.propTypes = {
  projects: PropTypes.array,
  setSearchResult: PropTypes.func
}

export default SearchBar
