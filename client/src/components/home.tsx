import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import HomeProject from './homeProject'
import SearchBar from './searchBar'
import { Project, PostsData } from '../interfaces/projectInterface'

const serverURL = process.env.REACT_APP_SERVER

const Home: React.FC = () => {
  const [projects, setProjects] = useState<PostsData>({ posts: [] })
  const [searchResults, setSearchResult] = useState<Project[]>([])

  const getProjects = async () => {
    try {
      const response = await fetch(`${serverURL}/posts`)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  useEffect(() => {
    setSearchResult(projects ? [...projects.posts].reverse() : [])
  }, [projects])

  return (
    <>
    <div><SearchBar projects={(projects && typeof projects !== 'string') ? projects.posts : []} setSearchResult={setSearchResult}/></div>
      <div>
        {searchResults && searchResults.map((project) => (
            <HomeProject key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}

export default Home
