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
        <AddPanel addItem={this.addItem} />
        <AddGate addItem={this.addItem} />
        <ul>
          {this.state.items.map(item => (
            <li>
              {item.type} {item.grade} {item.width} {item.finialCount}{" "}
              {item.qty}
            </li>
          ))}
        </ul>
      </Page>
    );
  }
}
