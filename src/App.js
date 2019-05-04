import React, { Component} from 'react';
import logo from './logo.svg';
import Radium { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component{
  state = {
    persons: [
      { id: '1', name: 'Serhiy', age: 24},
      { id: '2', name: 'Sasha', age: 18},
      { id: '3', name: 'Serhiy', age: 28}
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //const person = Object.assign({}, this.state.persons[personIndex]);

    this.setState( {
      persons: persons
    } )
    //console.log('Was clicked!');
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render(){
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={() => this.deletePersonHandler(index)} 
            name={person.name}
            age={person.age}
            key={person.id} 
            changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div> 
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    //let classes = ['red', 'bold'].join(' ');
    //let classes = ['red', 'bold'].join(' ');
    const classes = [];
    if(this.state.persons.length <=2) {
      classes.push('red');
    }
    if(this.state.persons.length <=1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really work!!!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {persons}      
        </div>
      </StyleRoot>
    );
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}
export default Radium(App);