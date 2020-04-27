import React from "react";
import Tree from "react-tree-graph";

const TreeDisplay = props => {
  if (!props.data) {
    return <p>Didn't get props.species[3]</p>;
  }


  
  return (
    <Tree
      data={props.data}
      height={500}
      width={1000}
      keyProp="banana"
      labelProp="name"
      gProps={{
        onClick: props.onClick
      }}
      animated
      duration={1000}
    />
  );
};

export default TreeDisplay;
