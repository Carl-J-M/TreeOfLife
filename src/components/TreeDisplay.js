import React from "react";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import { easeElastic } from "d3-ease";
import "../App.css";
import "../styles/TreeDisplay.css";

const TreeDisplay = props => {
  if (!props.data) {
    return <p>No data to show.</p>;
  }


  
  return (
    <div className="custom-container">
      <Tree
        data={props.data}
        height={800}
        width={1200}
        keyProp="apiKey"
        labelProp="name"
        gProps={{
          className: "custom",
          onClick: props.onClick
        }}
        animated
        duration={800}
        easing={easeElastic}
        className="treeDisplay"
      />
    </div>
  );
};


export default TreeDisplay;
