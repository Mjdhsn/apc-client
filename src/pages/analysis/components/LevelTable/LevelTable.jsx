import { useState, useEffect } from "react";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Checkbox } from "@mantine/core";
import { useLocation } from "react-router-dom";
//
import css from "./LevelTable.module.scss";
import { presidentialLevels, repLevels, senateLastLevels, senateLevels } from "../../../../utils/partyAnalysis";


const LevelTable = ({ receivedlevel, setLevel, routeLevel }) => {

  // hook
  const { state } = useLocation()
  const [levels, setLevels] = useState([])

  // use effect
  useEffect(() => {

    if(state.parent == "Presidential"){
      setLevels(presidentialLevels)
    }else if(state.parent == "Senate"){
      if(routeLevel == 1){
        setLevels(senateLastLevels)
      }else{
        setLevels(senateLevels)
      }
    }else if(state.parent == "REP"){
      if(routeLevel == 1){
        setLevels(repLevels)
      }else{
        setLevels(repLevels)
      }
    }else{
      setLevels(presidentialLevels)
    }

  }, [state])

  return (
    <>
      <p>Select the Level</p>

      <Table className={css.table}>
        <Tbody className={css.tbody}>
          <Tr className={css.trow}>
            {levels.map((level, i) => {
              const element = () => {
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
                 )
              }
              
              if(state.parent === "Senate" && routeLevel === 1){
                return element()
              }else{
                if(level.level <= routeLevel){
                  return element()
                }
              }
            })}
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default LevelTable;
