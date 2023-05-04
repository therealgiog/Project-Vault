import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import HomeProject from './homeProject'
import SearchBar from './searchBar'

const serverURL = process.env.REACT_APP_SERVER

interface Project {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  [key: string]: any;
}

interface PostsData {
  posts: Project[];
}

const Home: React.FC =  () => {
  const [projects, setProjects] = useState<PostsData | ''>('')
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
    <div><SearchBar projects={(projects && typeof projects !== 'string' ) ? projects.posts : []} setSearchResult={setSearchResult}/></div>
      <div>
        {searchResults && searchResults.map((project) => (
            <HomeProject key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}

export default Home