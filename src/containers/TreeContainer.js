import React from 'react';
import TreeDisplay from '../components/TreeDisplay';
import '../App.css'
import { identifier } from '@babel/types';

class TreeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.onChildClick = this.onChildClick.bind(this);
    this.inititalizeKingdoms = this.inititalizeKingdoms.bind(this);
    this.onParentClick = this.onParentClick.bind(this);
  }
  componentDidMount() {
    this.inititalizeKingdoms();
  }
  inititalizeKingdoms() {
    const url = "https://api.gbif.org/v1/species";

    fetch(url)
      .then(res => res.json())
      .then(apiData =>
        this.setState({
          data: {
            name: "LUCA (Last Universal Common Ancestor)",
            gProps: {
              className: "node",
              onClick: this.inititalizeKingdoms
            },
            children: this.formatChildren(
              this.filterKingdom(apiData["results"])
            )
          }
        })
      )
      .catch(err => console.error);
  }

  formatChildren(data) {
    const formattedData = data.reduce((acc, element) => {
      if (element.taxonomicStatus == "ACCEPTED") {
        acc.push({
          name: element.canonicalName,
          apiKey: element.key,
          className: "node",
          children: []
        });
      }
      return acc;
    }, []);

    return formattedData;
  }

  formatParent(apiData) {
    return {
      name: apiData.canonicalName.toUpperCase(),
      apiKey: apiData.key,
      className: "node",
      gProps: {
        onClick: this.onParentClick,
        className: "node"
      },
      children: []
    };
  }

  filterKingdom(data) {
    const filteredData = data.filter(element => {
      return element.rank == "KINGDOM";
    });
    return filteredData;
  }

  updateState(parentData) {
    this.getChildrenOfClicked(parentData.apiKey).then(childrenData => {
      this.setState({
        data: {
          ...parentData,
          children: childrenData
        }
      });
    });
  }

  getChildrenOfClicked(nodeKey, name) {
    console.log("getChildrenOfClicked", nodeKey, name);
    const url = `https://api.gbif.org/v1/species/${nodeKey}/children`;
    return fetch(url)
      .then(res => res.json())
      .then(apiData => this.formatChildren(apiData.results));
  }

  getClicked(nodeKey) {
    const url = `https://api.gbif.org/v1/species/${nodeKey}`;
    return fetch(url)
      .then(res => res.json())
      .then(apiData => apiData);
  }

  getParentOfClicked(nodeKey) {
    const url = `https://api.gbif.org/v1/species/${nodeKey}/parents`;
    return fetch(url)
      .then(res => res.json())
      .then(apiData => apiData[0]);
  }

  onParentClick(event, nodeKey) {
    // fetch parent
    // if no parents, Kingdom, fetch kingdoms
    // if parents, fetchChildren
    // updateState
    this.getParentOfClicked(nodeKey)
      .then(data => {
          if (!data) {
            this.inititalizeKingdoms();
          } else {
            const parentData = this.formatParent(data);
            this.updateState(parentData);
          }
      })
  }

  onChildClick(event, nodeKey) {
    // fetch current, fetch children
    // updateState
    this.getClicked(nodeKey)
      .then(data => this.formatParent(data))
      .then(parentData => this.updateState(parentData));
  }

  render() {
    return (
      <TreeDisplay
        data={this.state.data}
        onClick={this.onChildClick}
        className="treeDisplay"
      />
    );
  }
}

export default TreeContainer;