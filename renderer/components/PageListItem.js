import { Pane, Button, Text } from "evergreen-ui";
import Link from "next/link";

export default props => (
  <Link href={"/" + props.page}>
    <Button
      appearance="minimal"
      float="left"
      backgroundColor="white"
      border="1px solid #d3d3d3"
      width={200}
      height={120}
      margin={24}
      display="flex"
      disabled={props.disabled}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {props.children}
      <Text>{props.page.toString().toUpperCase()}</Text>
    </Button>
  </Link>
);
