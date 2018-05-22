import React, { Component } from 'react';

const Person = props => (
  <div className="Person">
    <div className="Person-name">{props.person.name}</div>
    <div className="Person-member">{props.person.member}</div>
  </div>
);

const Family = props => (
  <React.Fragment>
    {props.members.map(member =>
      <Person key={member.name} person={member} />
    )}
  </React.Fragment>
);

const FamilyForm = props => (
  <form onSubmit={props.addFamilyMember}>
    <div className="FormRow">
      <label htmlFor="name">Name: </label>
      <input
        name="name"
        onChange={props.onInputChange}
      />
    </div>
    <div className="FormRow">
      <label htmlFor="member">Family Member: </label>
      <input
        name="member"
        onChange={props.onInputChange}
      />
    </div>
    <div className="FormRow">
      <button>Add a Family Member</button>
    </div>
  </form>
);

class App extends Component {
  state = {
    family: [],
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
      name: results.name,
      member: results.member
    }]);

    this.setState({ family });
  };

  render() {
    const { family } = this.state;

    return (
      <div className="App">
        <h1>{"My Family's Context"}</h1>
        <Family members={family} />
        <FamilyForm
          addFamilyMember={this.addFamilyMember}
          onInputChange={this.onInputChange}
        />
      </div>
    );
  }
}

export default App;
