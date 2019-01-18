import { Table } from "evergreen-ui";
import Item from "./Item";

export default props => (
  <Table.Body padding={50}>
    <Table.Head>
      <Table.TextCell textAlign="center">Items</Table.TextCell>
    </Table.Head>
    <Table.Head>
      <Table.TextCell>Item</Table.TextCell>
      <Table.TextCell>Grade</Table.TextCell>
      <Table.TextCell>Width/Opening ( Inches )</Table.TextCell>
      <Table.TextCell>Finial Count</Table.TextCell>
      <Table.TextCell>Item Count</Table.TextCell>
    </Table.Head>
    <Table.Body>
      {props.items.map(item => (
        <Item
          type={item.type}
          grade={item.grade}
          width={item.width}
          finialCount={item.finialCount}
          qty={item.qty}
        />
      ))}
    </Table.Body>
  </Table.Body>
);
