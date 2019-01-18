import React from "react";
import { Pane } from "evergreen-ui";
import Page from "../layouts/blank";
import PageList from "../components/PageList";

export default () => (
  <Page>
    <Pane
      padding={16}
      marginTop={10}
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <img src="/static/ag-logo.png" alt="Alumi-Guard" width={250} />
    </Pane>
    <PageList />
  </Page>
);
