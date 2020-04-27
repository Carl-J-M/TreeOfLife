import React from 'react';
import TreeDisplay from '../components/TreeDisplay';
import '../styles/TreeContainer.css'
class TreeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const url = "https://api.gbif.org/v1/species";

    fetch(url)
      .then(res => res.json())
      .then(apiData =>
        this.setState({
          data: {
            name: "Kingdoms",
            children: this.getKingdoms(apiData["results"])
          }
        })
      )
      .catch(err => console.error);
  }

  getKingdoms(data) {
    const kingdoms = data.reduce((acc, element) => {
      if (element.rank == "KINGDOM" && element.taxonomicStatus == "ACCEPTED") {
        acc.push({
          name: element.canonicalName,
          banana: element.kingdomKey,
          children: []
        });
      }
      return acc;
    }, []);
    return kingdoms;
  }
  getPhylums(data) {
      const phylums = data.reduce((acc, element) => {
        if (element.rank == "PHYLUM" && element.taxonomicStatus == "ACCEPTED") {
            acc.push({
                name: element.canonicalName,
                banana: element.phylumKey,
                children: []
            })
        }
        return acc;
    }, [])
    console.log("getPhylums", phylums);
    return phylums;
  }

    onClick(event, nodeKey) {
        this.fetchChildrenOfKingdom(nodeKey)
    }

    fetchChildrenOfKingdom(key){
        const url = `https://api.gbif.org/v1/species/${key}/children`;
            fetch(url)
              .then(res => res.json())
              .then(apiData =>
                this.setState(prevState => {
                  return {
                    data: Object.assign({}, prevState.data, {
                      children: prevState.data.children.map(kingdom => {
                          console.log("outside if", key, kingdom.banana)
                        if (kingdom.banana == key) {
                            console.log("inside if", kingdom.key)
                          return Object.assign({}, kingdom, {
                            children: this.getPhylums(apiData.results)
                          });
                        }
                        return kingdom;
                      })
                    })
                  };
                })
              )
              .catch(err => console.error);
            
    }

  render() {
    return <TreeDisplay data={this.state.data} onClick={this.onClick} className="treeDisplay"/>;
  }
}

export default TreeContainer;