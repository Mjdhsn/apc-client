import React from "react";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Checkbox } from "@mantine/core";
const PartyTable = ({ values, handlers }) => {
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;
  return (
    <>
      <p>Select the party/parties/All</p>
      <Table className="table">
        <Tbody className="tbody">
          <Tr className="tr">
            <Td className="td" rowSpan="2">
              <Checkbox
                className="checkbox"
                labelPosition="left"
                label={"All"}
                color="dark"
                size="md"
                checked={allChecked}
                indeterminate={indeterminate}
                transitionDuration={0}
                onChange={() =>
                  handlers.setState((current) =>
                    current.map((value) => ({ ...value, checked: !allChecked }))
                  )
                }
              />
            </Td>
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
                    onChange={(event) =>
                      handlers.setItemProp(
                        i,
                        "checked",
                        event.currentTarget.checked
                      )
                    }
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
                    onChange={(event) =>
                      handlers.setItemProp(
                        i+9,
                        "checked",
                        event.currentTarget.checked
                      )
                    }
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
