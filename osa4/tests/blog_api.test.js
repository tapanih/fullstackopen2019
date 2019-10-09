const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs/')
  expect(res.body.length).toBe(helper.initialBlogs.length)
})

test('blogs have a field called id', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
  expect(blogs[2].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('First class tests')
  const authors = blogsAtEnd.map(blog => blog.author)
  expect(authors).toContain('Robert C. Martin')
  const urls = blogsAtEnd.map(blog => blog.url)
  expect(urls).toContain('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
})

afterAll(() => {
  mongoose.connection.close()
})