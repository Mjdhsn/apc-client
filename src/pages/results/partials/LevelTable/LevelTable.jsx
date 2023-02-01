import React from "react";
import { useLocation } from "react-router-dom";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
//
import css from "./LevelTable.module.scss";
import { levels } from "../../../../utils/results";
import { Checkbox } from "@mantine/core";
import { repLevels, senateLevels } from "../../../../utils/partyAnalysis";


const LevelTable = ({ receivedlevel, setLevel, routeLevel }) => {

  // hook
  const location = useLocation()

  // conditional levels
  const selectedLevels = location.pathname === "/results/presidential" && levels || location.pathname === "/results/senate" && senateLevels || location.pathname === "/results/rep" && repLevels

  return (
    <>
      <p>Select the Level</p>
      <Table className={css.table}>
        <Tbody className={css.tbody}>
          <Tr className={css.trow}>
            {selectedLevels.map((level, i) => {
              if (level.level <= routeLevel) {
                return (
                  <Td className={css.td} key={i}>
                    <Checkbox
                      className={css.checkbox}
                      labelPosition="left"
                      label={level.name}
                      color="dark"
                      size="md"
                      value={level.value}
                      checked={receivedlevel === level.value}
                      onChange={() => setLevel(level.value)}
                    />
                  </Td>
                );
              }
            })}
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default LevelTable;
