import React from "react";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Checkbox } from "@mantine/core";


const PartyTable = ({ values, setParty }) => {  
  return (
    <>
      <p>Select the party/parties/All</p>

      <Table className="table">
        <Tbody className="tbody">
          <Tr className="tr">
            {values.slice(0, 9).map((value, i) => {
              return (
                <Td className="td" key={i}>
                  <Checkbox
                    className="checkbox"
                    labelPosition="left"
                    label={value.label}
                    color="dark"
                    size="md"
                    checked={value.checked}
                    onChange={(event) => setParty(value.label) }
                  />
                </Td>
              );
            })}
          </Tr>

          <Tr className="tr">
            {values.slice(9, 18).map((value, i) => {
              return (
                <Td className="td" key={i}>
                  <Checkbox
                    className="checkbox"
                    labelPosition="left"
                    label={value.label}
                    color="dark"
                    size="md"
                    checked={value.checked}
                    onChange={(event) => setParty(value.label)  }
                  />
                </Td>
              );
            })}
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default PartyTable;
