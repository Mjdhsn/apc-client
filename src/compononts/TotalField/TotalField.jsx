import { Button, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import Modal from "./Modal/Modal";
import css from "./TotalField.module.scss";

const TotalField = ({label, total, table, registered, secondLabel}) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className={css.container}>
      <TextInput label={label} className={css.input} value={Object.values(total[0])[0]} readOnly/>
      <Button compact className={css.button} color="dark" onClick={()=>setModalOpened(true)}>
        See more
      </Button>
      <Modal table={table} modalOpened={modalOpened} setModalOpened={setModalOpened}/>
      <TextInput label={secondLabel || "Total Registered Votes"} className={css.input} value={Object.values(registered[0])[0]} readOnly/>
    </div>
  );
};

export default TotalField;
