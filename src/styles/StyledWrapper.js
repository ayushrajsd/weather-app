import styled from "styled-components";

// const blue = require("../../assets/blue.jpg");
// const orange = require("../../assets/orange.jpg");
// const green = require("../../assets/green.jpg");

const StyledDiv = styled.div`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-image: url(${(props) => props.bgImage});
`;

export default StyledDiv;
