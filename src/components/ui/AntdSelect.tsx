import React from "react";
import { Select } from "antd";

interface AntdSelectProps {
  id?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const AntdSelect: React.FC<AntdSelectProps> = ({ id = "", options, value, onChange, placeholder = "Select ..." }) => {
  return (
    <Select
      id={id}
      value={value}
      showSearch
      style={{ width: 200 }}
      placeholder={placeholder}
      optionFilterProp='label'
      filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
      options={options}
      onChange={onChange}
    />
  );
};

export default AntdSelect;
