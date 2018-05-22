import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext();

const Person = props => (
  <div className="Person">
    <div className="Person-name">{props.person.name}</div>
    <div className="Person-member">{props.person.member}</div>
  </div>
);

const Family = props => (
  <Consumer>
    {context => (
      <React.Fragment>
        {context.state.family.map(person =>
          <Person key={person.name} person={person} />
        )}
      </React.Fragment>
    )}
  </Consumer>
);

const FamilyMemberForm = props => (
  <Consumer>
    {context => (
      <form onSubmit={context.actions.addFamilyMember}>
        <div className="FormRow">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            onChange={context.actions.onInputChange}
          />
        </div>
        <div className="FormRow">
          <label htmlFor="member">Family Member: </label>
          <input
            name="member"
            onChange={context.actions.onInputChange}
          />
        </div>
        <div className="FormRow">
          <button>Add a Family Member</button>
        </div>
      </form>
    )}
  </Consumer>
);

class FamilyProvider extends Component {
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

  get actions() {
    return {
      addFamilyMember: this.addFamilyMember,
      onInputChange: this.onInputChange
    };
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: this.actions
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <FamilyProvider>
        <h1>{"My Family's Context"}</h1>
        <Family />
        <FamilyMemberForm />
      </FamilyProvider>
    );
  }
}

export default App;
