import { Select } from '@mantine/core';

export default function ComboBox({data, disabled, setValue, value, label=""}) {
    return(
        <Select
          value={value}
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          maxDropdownHeight={280}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          data={data}
          disabled = {disabled}
          onChange = {(value)=>setValue(value)}
          style={{width: "100%"}}
          label={label}
      />
    )
};
