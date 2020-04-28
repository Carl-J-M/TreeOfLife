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
    this.onClick = this.onClick.bind(this);
    this.inititalizeKingdoms = this.inititalizeKingdoms.bind(this);
  }

  componentDidMount() {
    this.inititalizeKingdoms();
  }

  inititalizeKingdoms(){
       const url = "https://api.gbif.org/v1/species";

       fetch(url)
         .then(res => res.json())
         .then(apiData =>
           this.setState({
             data: {
               name: "Kingdoms",
               gProps: {
                 className: "rootNode",
                 onClick: this.inititalizeKingdoms
               },
               children: this.formatRank(this.filterKingdom(apiData["results"]))
             }
           })
         )
         .catch(err => console.error);
  }
  formatRank(data) {
      
      const formattedData = data.reduce((acc, element) => {
          if (element.taxonomicStatus == "ACCEPTED") {
                acc.push({
                    name: element.canonicalName,
                    apiKey: element.key,
                    className: "node",

                    children: []
                })
          }
          return acc;
      },[])
      
      return formattedData;
  }
  filterKingdom(data) {
      const filteredData = data.filter(element => {
            return (element.rank == "KINGDOM")
      })
      return filteredData;
  }


  getChildrenOfCurrent(nodeKey){

      const url = `https://api.gbif.org/v1/species/${nodeKey}/children`
      fetch(url)
              .then(res => res.json())
              .then(apiData =>
                this.setState(prevState => {
                    return {
                      data: {
                        name: prevState.data.children.find(
                          element => element.apiKey == nodeKey
                        ).name,
                        gProps: {
                          onClick: this.inititalizeKingdoms,
                          className: "node"
                        },
                        children: this.formatRank(apiData.results)
                      }
                    };
                }));

  }

    onClick(event, nodeKey) {

        this.getChildrenOfCurrent(nodeKey);
    }

  render() {
    return <TreeDisplay data={this.state.data} onClick={this.onClick} className="treeDisplay"/>;
  }
}

export default TreeContainer;