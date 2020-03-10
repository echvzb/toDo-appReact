import React from "react";
import "./styles.css";

let id = 0;
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "diciembre"
];

const Todo = props => {
  return (
    <div className="columns">
      <div className="column">
        <input
          onChange={props.onToggle}
          type="checkbox"
          checked={props.todo.checked}
        />
        <span className="title is-5">
          {" "}
          <span className="has-text-link">{props.todo.text}</span>
          <br />
          Registrado el {props.todo.time.getDate()} de{" "}
          {MESES[props.todo.time.getMonth()]} a las {props.todo.time.getHours()}
          :{props.todo.time.getMinutes()}{" "}
        </span>
      </div>
      <div className="column">
        <button
          onClick={props.onDelete}
          className="button is-rounded is-danger is-fullwidth"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};
const Header = props => {
  return (
    <div>
      <section class="hero is-primary has-text-centered">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-3">Cosas por hacer</h1>
          </div>
        </div>
      </section>
      <section className="columns has-text-centered ">
        <div className="column has-background-info">
          <h2 className="subtitle is-4 has-text-white">
            Elementos: {props.elem}
          </h2>
        </div>
        <div className="column has-background-warning">
          <h2 className="subtitle is-4">Pendientes: {props.pend}</h2>
        </div>
      </section>
    </div>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: []
    };
  }
  toggleBox(id) {
    this.setState({
      todo: this.state.todo.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
          time: todo.time
        };
      })
    });
  }
  deleteTodo(id) {
    this.setState({
      todo: this.state.todo.filter(todo => {
        return todo.id !== id;
      })
    });
  }
  newTodo() {
    let text = prompt("Cosa por hacer: ");
    if (text == null || text === "") {
      alert("Por favor escribe escribe una entrada");
      return;
    }
    this.setState({
      todo: [
        ...this.state.todo,
        {
          id: id++,
          text: text,
          checked: false,
          time: new Date()
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <Header
          elem={this.state.todo.length}
          pend={
            this.state.todo.filter(todo => {
              return !todo.checked;
            }).length
          }
        />
        <section className="section">
          <div className="container">
            <div>
              <button
                className="button is-primary is-medium is-fullwidth"
                onClick={() => {
                  this.newTodo();
                }}
              >
                Agregar
              </button>
            </div>
            <div className="box">
              {this.state.todo.map(todo => {
                return (
                  <Todo
                    todo={todo}
                    onToggle={() => {
                      this.toggleBox(todo.id);
                    }}
                    onDelete={() => {
                      this.deleteTodo(todo.id);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
