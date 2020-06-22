import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (evt: FormElement): void => {
    evt.preventDefault();
    addTodo(value);
    setValue(``);
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Hi There</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(evt) => setValue(evt.target.value)} required />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map(({ text, complete }: ITodo, i: number) => (
          <Fragment key={i}>
            <div>{text}</div>
            <button type="button" onClick={() => completeTodo(i)}>
              {complete ? 'Incomplete' : 'Complete'}
            </button>
          </Fragment>
        ))}
      </section>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
