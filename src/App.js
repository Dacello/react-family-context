import React, { Component } from 'react';

const Person = props => (
  <li className="Person">
    <div className="Person-name">{props.person.name}</div>
    <div className="Person-memberType">{props.person.member}</div>
  </li>
);

const Family = props => (
  <ul className="family">
    {props.members.map(member =>
      <Person key={member.name} person={member} />
    )}
  </ul>
);

class App extends Component {
  state = {
    family: [{ name: 'Daniel', member: 'Me' }],
    results: {}
  };

  onInputChange = (e) => {
    const { results } = this.state;

    results[e.target.name] = e.target.value;

    this.setState({ results });
  };

  addFamilyMember = e => {
    e.preventDefault();
    const { results } = this.state;

    if (!results.name || !results.member) return;

    const family = this.state.family.concat([{
      name: this.state.results.name,
      member: this.state.results.member
    }]);

    this.setState({ family });
  };

  render() {
    const { family } = this.state;

    return (
      <div className="App">
        <h1>{"My Family's Context"}</h1>
        <Family members={family} />
        <form onSubmit={this.addFamilyMember}>
          <div className="FormRow">
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              onChange={this.onInputChange}
            />
          </div>
          <div className="FormRow">
            <label htmlFor="member">Family Member: </label>
            <input
              name="member"
              onChange={this.onInputChange}
            />
          </div>
          <div className="FormRow">
            <button>Add a Family Member</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
