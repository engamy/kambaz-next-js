import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { RootState } from "../../store";
import { FormControl, Button } from 'react-bootstrap';

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();
  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" value={isNaN(a) ? '' : a}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setA(isNaN(value) ? 0 : value);
        }} />
      <FormControl type="number" value={isNaN(b) ? '' : b}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setB(isNaN(value) ? 0 : value);
        }} />
      <Button id="wd-add-redux-click"
              onClick={() => dispatch(add({ a, b }))}>
        Add Redux
      </Button>
      <hr/>
    </div>
  );
}
