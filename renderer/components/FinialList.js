import { Table } from "evergreen-ui";
import FinialListItem from "./FinialListItem";

export default props => (
  <Table.Body padding={50}>
    <Table.Head>
      <Table.TextCell textAlign="center">Finials</Table.TextCell>
    </Table.Head>
    <Table.Head>
      <Table.TextCell>Number</Table.TextCell>
      <Table.TextCell>Description</Table.TextCell>
      <Table.TextCell>Color</Table.TextCell>
      <Table.TextCell>Count</Table.TextCell>
    </Table.Head>
    <Table.Body>
      {props.finials.map(item => (
        <FinialListItem
          key={item.number}
          number={item.number}
          description={item.description}
          color={item.color}
          count={item.count}
        />
      ))}
    </Table.Body>
  </Table.Body>
);
