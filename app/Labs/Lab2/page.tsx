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

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
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
      
    </div>
  );
}
