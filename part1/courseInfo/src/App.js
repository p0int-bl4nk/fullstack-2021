const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
}

const Part = (props) => {
    return (
        <p>{props.title} {props.exercise}</p>
    );
}

const Content = (props) => {
    return (
        <div>
            <Part title={props.parts[0].name} exercise={props.parts[0].exercises}/>
            <Part title={props.parts[1].name} exercise={props.parts[1].exercises}/>
            <Part title={props.parts[2].name} exercise={props.parts[2].exercises}/>
        </div>
    );
}

const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.parts.length; i++) {
        total += props.parts[i].exercises;
    }
    return (
        <p>Number of exercises {total}</p>
    );
}

function App() {
  const course = {
      name: 'Half Stack application development',
      parts: [
          {
              name: 'Fundamentals of React',
              exercises: 10
          },
          {
              name: ' Using props to pass data',
              exercises: 7
          },
          {
              name: 'State of a component',
              exercises: 14
          }
      ]
  };

  return (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>
  );
}

export default App;
