import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0)

  return <p>yhteensä {total} tehtävää</p>
}
  
const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Course = ({courses}) => (
  <div>
    <h1>Opetusohjelma</h1>
    {courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>))}
  </div>
)

export default Course 