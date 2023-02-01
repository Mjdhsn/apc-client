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
     {Array.isArray(table[0].names) ?
      <Table className="table">
        <thead>
          <tr>
            <th> S/N </th>
            {Object.keys(table[0].names[0]).map((name, i) => {
              return <th key={i}>{name.replace("_", " ")}</th>;
            })}
            <th> Total Registered Voters </th>
          </tr>
        </thead>

        <tbody>
          {table[0].names.map((name, i) => {
            return <tr key={i}>
                <td> {i++} </td>
                {
                  Object.values(name).map((value, j)=>{
                    return <td key={j}>{value}</td>
                  })
                }
                <td>{table[0].total[0].Total_Registered_voters}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    : "No Results to Show" }
    </MantineModal>
  );
};

export default Modal;
