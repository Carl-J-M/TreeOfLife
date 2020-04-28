import React from "react";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import { easeElastic } from "d3-ease";
import "../App.css";

const TreeDisplay = props => {
  if (!props.data) {
    return <p>Didn't get props.species[3]</p>;
  }


  
  return (
    <div className="custom-container">
      <Tree
        data={props.data}
        height={500}
        width={800}
        keyProp="apiKey"
        labelProp="name"
        gProps={{
          className: "custom",
          onClick: props.onClick
        }}
        animated
        duration={200}
        easing={easeElastic}
      />
    </div>
  );
};


export default TreeDisplay;
