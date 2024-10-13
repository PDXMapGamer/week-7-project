import { useState } from "react";
import Table from "../components/Table";
import "./TablePage.css";
export default function TablePage() {
  const [formValue, setFormValue] = useState("");

  function handleFormValueChange(event) {
    setFormValue(event.target.value);
  }
  return (
    <section id="view-table">
      <form id="table-form">
        <label htmlFor="table">Select table to view: </label>
        <select name="table-list" id="table" value={formValue} onChange={handleFormValueChange}>
          <option value="">Select Table</option>
          <option value="games">Games</option>
          <option value="characters">Characters</option>
        </select>
      </form>
      <Table formValue={formValue} />
    </section>
  );
}
