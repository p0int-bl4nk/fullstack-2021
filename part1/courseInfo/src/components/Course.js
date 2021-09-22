export const Header = ({title, type}) => {
  return (
    type === 'h1'
      ? <h1>{title}</h1>
      : <h2>{title}</h2>
  );
}

const Part = (props) => {
  return (
    <p>{props.title} {props.exercise}</p>
  );
}

const Content = ({parts}) => {
  return (
    parts.map(part => {
      return (
        <Part
          key={part.id}
          title={part.name}
          exercise={part.exercises}
        />
      );
    })
  );
}

const Total = (props) => {
  const total = props.parts.reduce((total, next) => {
    return total + next.exercises;
  }, 0);

  return (
    <p><strong>Total of {total} exercises</strong></p>
  );
}

export const Course = ({courses}) => {
  return courses.map(course => (
    <div key={course.id}>
      <Header title={course.name} type={'h2'}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  ));
}