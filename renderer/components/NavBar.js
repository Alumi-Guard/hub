import React, { Component } from "react";
import Link from "next/link";
import { Pane, Button, Heading } from "evergreen-ui";

export default class extends Component {
  render() {
    return (
      <Pane display="flex" padding={16} margin={0} background="tint1">
        <Pane>
          <Heading size={500}>Finial</Heading>
          <Heading size={500}>Calculator</Heading>
        </Pane>
        <Pane
          flex={1}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <img src="/static/ag-logo-small.png" alt="Alumi-Guard" height={45} />
        </Pane>
        <Pane>
          <Link href="/start">
            <Button appearance="primary">Back</Button>
          </Link>
        </Pane>
      </Pane>
    );
  }
}
