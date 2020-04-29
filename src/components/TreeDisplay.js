import React from "react";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";
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
        width={1100}
        keyProp="apiKey"
        labelProp="name"
        gProps={{
          className: "custom",
          onClick: props.onClick
        }}
        animated
        duration={800}
        className="treeDisplay"
      />
    </div>
  );
};


export default TreeDisplay;
