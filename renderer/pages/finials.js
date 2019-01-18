import React, { Component } from "react";
import { Pane, minorScale } from "evergreen-ui";
import Page from "../layouts/main";
import AddPanel from "../components/AddPanel";
import AddGate from "../components/AddGate";
import ItemList from "../components/ItemList";
import FinialList from "../components/FinialList";
import finials from "../data/finials";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      finials: []
    };
  }

  addItem = (type, grade, width, finialCount) => {
    var newItems;
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
    this.addFinial(grade.toUpperCase(), "QUAD", "BLACK", finialCount);
  };

  addFinial = (grade, type, color, count) => {
    let newFinials;
    // find finial number with properties
    const finialCheck = finials.filter(finial => {
      return (
        finial.grade === grade && finial.type === type && finial.color === color
      );
    });

    if (finialCheck) {
      newFinials = [
        ...this.state.finials,
        {
          number: finialCheck[0].number,
          description: finialCheck[0].description,
          color,
          count
        }
      ];
    }

    // check if finial with same number is in state, if so add to quantity for that item
    // If not in state append onto the end of the state

    this.setState({ finials: newFinials });
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
