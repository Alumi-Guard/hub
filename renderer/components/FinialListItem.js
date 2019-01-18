import { Table } from "evergreen-ui";
export default props => (
  <Table.Row>
    <Table.TextCell>{props.number}</Table.TextCell>
    <Table.TextCell>{props.description}</Table.TextCell>
    <Table.TextCell>{props.color}</Table.TextCell>
    <Table.TextCell>{props.count}</Table.TextCell>
  </Table.Row>
);
