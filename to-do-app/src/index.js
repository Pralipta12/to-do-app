import React, { Component } from 'react';
import { render } from 'react-dom';
//import './style.css';
import'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      list: [],
      itemName: '',
      selected: [],
      selectAll: false
    };
  }
  handleOnCheckboxChange = (index) => {
    const selected = this.state.selected;
    selected[index] = !selected[index];
    this.setState({ selected: selected });
    console.log(this.state.selected);
  };
  handleOnSelectAllCheckboxChange = () => {
    const selected = this.state.selected;
    const selectAll = !this.state.selectAll;
    const selRes = this.state.list.map((i) => {
      return selectAll;
    });
    console.log('selRes', selRes)
    this.setState({ selected: selRes, selectAll: selectAll });
  }
  handleChange = (event) => {
    this.setState({ itemName: event.target.value });
  };
  delete = (index) => {
    if (this.state.selected[index]) {
      this.state.list.splice(index, 1);
      this.state.selected.splice(index, 1);
      this.setState({ list: this.state.list, selected: this.state.selected });
      console.log(index);
    }
  };
  deleteAll = (index) => {
    const selectedIndex = [];
    this.state.selected.forEach((x, indx) => {
      if(x === true) selectedIndex.push(indx)
    });
    console.log('selectedIndex', selectedIndex)
    const sSelect = this.state.selected.filter(function(value, index) {
      return selectedIndex.indexOf(index) == -1;
    });
    const sList = this.state.list.filter(function(value, index) {
      return selectedIndex.indexOf(index) == -1;
    });

    this.setState({ list: sList , selected: sSelect, selectAll: false});
    console.log(index);
  };
  add = () => {
    if(this.state.itemName) {
      const list = [...this.state.list];
      list.push(this.state.itemName);
      this.setState({ list: list });
      this.setState({ itemName: '' });
    } 
  };

  render() {
    const renderData = () => {
      return this.state.list.map((item, index) => {
        return (
          <div class='row'  key={item + '-' +index}>
            <div class='col-md-3'></div>
            <div class='col-md-5'>
            <input
              type="checkbox"
              checked={this.state.selected[index]}
              value={this.state.selected[index]}
              onChange={() => this.handleOnCheckboxChange(index)}
            />{' '}
            {item}
            </div>
            <div class='col-md-3'>
            <button class='btn-info' onClick={() => this.delete(index)}>Remove</button>
            </div>
          </div>
        );
      });
    };

    return (
      <div class='container bg-warning text-dark border border-primary'  >
        <div class='form'>
          <h2 class='display-2 text-center text-danger'>To Do App</h2>
          <div class='row'>
            <div class='col-md-2'></div>
            <div class='col-md-8'>
            <input
              type="text" class='form-control'
              placeholder='add your to-do item here'
              value={this.state.itemName}
              onChange={this.handleChange}
            />{' '}
            </div>
            <div class='col-md-2'></div>
          </div>
          <div class='row'>
            <div class='col-md-3'></div>
            <div class='col-md-2'><button class='form-control btn-success' onClick={this.add}>Add to LIst</button></div>
            <div class='col-md-2'></div>
            <div class='col-md-2'><button class='form-control btn-danger' onClick={this.deleteAll}>Delete Selected</button></div>
            <div class='col-md-3'></div>
          </div>
          {
            this.state.list.length > 0 ? 
            <div class='row'>
              <div class='col-md-3'></div>
              <div class='col-md-6 text-danger'>
              <input
              type="checkbox"
              checked={this.state.selectAll}
              value={this.state.selectAll}
              onChange={() => this.handleOnSelectAllCheckboxChange()}
            /> Click to select all
            </div>
          </div> 
          : null
          } 
          {renderData()}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
