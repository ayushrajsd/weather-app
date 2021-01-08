import React from "react";
import StyledInput from "./styles/StyledInput";

const SearchBox = (props) => (
  <form onSubmit={props.updateLocation}>
    <StyledInput type="text" onChange={props.searchText} />
  </form>
);

export default SearchBox;
