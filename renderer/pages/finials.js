import React, { Component } from "react";
import { Table } from "evergreen-ui";
import Page from "../layouts/main";
import AddPanel from "../components/AddPanel";
import AddGate from "../components/AddGate";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  addItem = (type, grade, width, finialCount) => {
    var newItems;
    console.log("addItem", grade, width, finialCount);
    // check array if item already there if so bump the qty++
    const itemcheck = this.state.items.findIndex(item => {
      return (
        item.type === type &&
        item.grade === grade &&
        item.width === width &&
        item.finialCount === finialCount
      );
    });
    console.log(itemcheck);
    if (itemcheck !== -1) {
      newItems = this.state.items;
      newItems[itemcheck].qty += 1;
    } else {
      newItems = [
        ...this.state.items,
        { type, grade, width, finialCount, qty: 1 }
      ];
    }

    this.setState({ items: newItems });
  };

  render() {
    return (
      <Page>
        <Pane
          width="100%"
          display="flex"
          marginTop={65}
          height={50}
          backgroundColor="#fff"
          position="fixed"
          top={0}
          alignItems="center"
          justifyContent="center"
        >
          <AddPanel addItem={this.addItem} marginRight={minorScale(3)} />
          <AddGate addItem={this.addItem} />
        </Pane>
        <Pane marginTop={100}>
          <ItemList items={this.state.items} />
          <FinialList finials={this.state.finials} />
        </Pane>
      </Page>
    );
  }
}
