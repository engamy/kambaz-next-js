import "./index.css";
import Selectors from "./Selectors";
import Foregroundcolors from "./Foregroundcolors";
import Backgroundcolors from "./Backgroundcolors";
import Borders from "./Borders";
import Float from "./Float";
import Corners from "./Corners";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import Margins from "./Margins";
import Padding from "./Padding";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import ReactIcons from "./ReactIcons";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

import { Container } from"react-bootstrap";

export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel
        right on the element. Although it&apos;s very convenient
        it is considered bad practice and you should avoid
        using the style attribute
      </p>


      <Selectors />
      <Foregroundcolors />
      <Backgroundcolors />
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <ReactIcons />

      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />
    </Container>
  );
}
