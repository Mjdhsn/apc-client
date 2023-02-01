import React from "react";
import { Modal as MantineModal, Table } from "@mantine/core";

const Modal = ({ table, modalOpened, setModalOpened }) => {
  return (
    <MantineModal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overflow="inside"
      size={"100%"}
    >
      {/* checking for array type because in case of empty table API is sending empty object instead of empty array */}
     {table.length > 0 ?
      <Table className="table">
        <thead>
          <tr>
            {Object.keys(table[0]).map((name, i) => {
              return <th key={i}>{name.replace("_", " ")}</th>;
            })}
          </tr>
        </thead>
        <tbody>
            {table?.map((ele, i) => (
              <tr key={i} >
                {Object.keys(ele).map((e, i) => <td key={i} >{ele[e]}</td>)}
              </tr>   
            ))}
        </tbody>
      </Table>
    : "No Results to Show" }
    </MantineModal>
  );
};

export default Modal;