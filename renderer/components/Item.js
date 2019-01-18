import { Table } from "evergreen-ui";
export default props => (
  <Table.Row>
    <Table.TextCell>{props.type.toUpperCase()}</Table.TextCell>
    <Table.TextCell>{props.grade.toUpperCase()}</Table.TextCell>
    <Table.TextCell>{props.width}</Table.TextCell>
    <Table.TextCell>{props.finialCount}</Table.TextCell>
    <Table.TextCell>{props.qty}</Table.TextCell>
  </Table.Row>
);
