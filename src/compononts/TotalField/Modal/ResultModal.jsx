import React from "react";
import { Modal as MantineModal, Table } from "@mantine/core";

const ResultModal = ({ table, modalOpened, setModalOpened }) => {
  return (
    <MantineModal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overflow="inside"
      size={"100%"}
    >
      {/* checking for array type because in case of empty table API is sending
      empty object instead of empty array */}
     {Array.isArray(table[0].names) ?
      <Table className="table">
        <thead>
          <tr>
            {Object.keys(table[0].names[0]).map((name, i) => {
              return <th key={i}>{name.replace("_", " ")}</th>;
            })}
            {Object.keys(table[0].total[0]).map((total, i) => {
              return <th key={i}>{total.replace("_", " ")}</th>;
            })}
            {Object.keys(table[0].other[0]).map((remarks, i) => {
              return <th key={i}>{remarks.replace("_", " ")}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {table[0].names.map((name, i) => {
            return <tr key={i}>
                {
                  Object.values(name).map((value, j)=>{
                    return <td key={j}>{value}</td>
                  })
                }
                {
                   Object.values(table[0].total[i]).map((value, k)=>{
                    return <td key={k}>{value}</td>
                  })
                }
                 {
                   Object.values(table[0].other[i]).map((value, l)=>{
                    return <td key={l}>{value}</td>
                  })
                }
            </tr>;
          })}
        </tbody>
      </Table>
    : "No Results to Show" }
    </MantineModal>
  );
};

export default ResultModal;
