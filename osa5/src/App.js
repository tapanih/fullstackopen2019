import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a, b) => b.likes - a)
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      newNotification(setNotification, 'wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const newNotification = (setter, message, type) => {
    const notification = { message, type }
    setter(notification)
    setTimeout(() => {
      setter(null)
    }, 5000)
  }

  const updateLikes = likedBlog => {
    const newBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
    blogService.update(likedBlog.id, newBlog)
    const newBlogs = blogs.map(blog => blog.id !== likedBlog.id ? blog : newBlog)
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    newNotification(setNotification, `Liked ${likedBlog.title} by ${likedBlog.author}`, 'success')
  }

  const removeBlog = removedBlog => {
    blogService.remove(removedBlog.id)
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    newNotification(setNotification, `Removed ${removedBlog.title} by ${removedBlog.author}`, 'success')
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? loginForm()
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout} type="button">logout</button></p>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              newNotification={newNotification}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
