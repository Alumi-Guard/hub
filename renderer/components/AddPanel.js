import React, { Component } from "react";
import { Dialog, Pane, Button, SelectField, Heading } from "evergreen-ui";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      widths: [{ value: 71.375, label: "6 FEET" }],
      grade: "residential",
      width: 71.375,
      finialCount: 15
    };
  }

  calculateWidths = grade => {
    switch (grade) {
      case "residential":
        this.calculateFinials(71.375, grade);
        this.setState({ grade, widths: [{ value: 71.375, label: "6 FEET" }] });
        break;

      case "guardian":
        this.calculateFinials(71.375, grade);
        this.setState({ grade, widths: [{ value: 71.375, label: "6 FEET" }] });
        break;

      case "commercial":
        this.calculateFinials(68.625, grade);
        this.setState({ grade, widths: [{ value: 68.625, label: "6 FEET" }] });
        break;

      case "municipal":
        this.calculateFinials(68.625, grade);
        this.setState({
          grade,
          widths: [
            { value: 68.625, label: "6 FEET" },
            { value: 91.75, label: "8 FEET" }
          ]
        });
        break;

      case "industrial":
        this.calculateFinials(72.125, grade);
        this.setState({
          grade,
          widths: [
            { value: 72.125, label: "6 FEET" },
            { value: 96.5, label: "8 FEET" }
          ]
        });
        break;

      case "imperial":
        this.calculateFinials(72.125, grade);
        this.setState({
          grade,
          widths: [
            { value: 72.125, label: "6 FEET" },
            { value: 96.5, label: "8 FEET" }
          ]
        });
        break;

      default:
        break;
    }
  };

  calculateFinials = (width, grade) => {
    var picketwidth = this.getPicketWidth(grade);
    const pktoncenter = picketwidth + 3.875;
    const finialCount = Math.floor(width / pktoncenter);
    this.setState({ width, finialCount });
  };

  getPicketWidth = grade => {
    switch (grade) {
      case "residential":
        return 0.625;

      case "guardian":
        return 1;

      case "commercial":
        return 0.75;

      case "municipal":
        return 0.75;

      case "industrial":
        return 1;

      case "imperial":
        return 1;

      default:
        return 0;
    }
  };

  render() {
    return (
      <Pane>
        <Dialog
          isShown={this.state.isShown}
          title="Add Panel"
          onCloseComplete={() => {
            this.setState({ isShown: false });
          }}
          onConfirm={() => {
            this.props.addItem(
              "panel",
              this.state.grade,
              this.state.width,
              this.state.finialCount
            );
            this.setState({ isShown: false });
          }}
          confirmLabel="Add"
        >
          <SelectField
            width="100%"
            height={40}
            padding={5}
            label="Grade"
            value={this.state.grade}
            onChange={event => this.calculateWidths(event.target.value)}
          >
            <option value="residential" checked>
              Residential
            </option>
            <option value="guardian">Guardian</option>
            <option value="commercial">Commercial</option>
            <option value="municipal">Municipal</option>
            <option value="industrial">Industrial</option>
            <option value="imperial">Imperial</option>
          </SelectField>
          <SelectField
            width="100%"
            value={this.state.width}
            height={40}
            padding={5}
            label="Width"
            onChange={event =>
              this.calculateFinials(event.target.value, this.state.grade)
            }
          >
            {this.state.widths.map(width => (
              <option value={width.value} key={width.label}>
                {width.label}
              </option>
            ))}
          </SelectField>
          <Pane
            flex={8}
            padding={10}
            alignContent="center"
            justifyContent="center"
            display="flex"
          >
            <Heading size={400}>Number of Finials</Heading>
          </Pane>
          <Pane
            flex={8}
            alignContent="center"
            justifyContent="center"
            display="flex"
          >
            <Heading size={800}>{this.state.finialCount}</Heading>
          </Pane>
        </Dialog>

        <Button onClick={() => this.setState({ isShown: true })}>
          Add Panel
        </Button>
      </Pane>
    );
  }
}
