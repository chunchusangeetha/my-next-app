'use client'

import { useState, useEffect } from 'react'

export default function FetchPosts() {
  const [posts, setPosts] = useState(null) // Set initial state to null to handle loading

  // Use useEffect to handle the async fetch operation
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://fakestoreapi.com/carts')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setPosts(data)
        sessionStorage.setItem('data',JSON.stringify(data));
        let sessionID = sessionStorage.getItem('data');
        console.log(sessionID,'data')
        localStorage.setItem('data',JSON.stringify(data));
        let sessiondata = sessionStorage.getItem('data');
        console.log(sessiondata,'sessiondata')
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData() // Trigger the fetch when the component mounts
  }, []) // Empty dependency array makes this run once on mount

  // Show loading while posts are being fetched
  if (posts === null) {
    return <div>Loading...</div>
  }

  // Render posts once they are fetched
  return (
    <div>
      <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.date}</li>
      ))}
    </ul>
    </div>
    
  )
}
