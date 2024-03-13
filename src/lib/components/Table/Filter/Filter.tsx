type FilterProps = {
  selectedValue?: string;
  setSelected: (value: string | undefined) => void;
};

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
  const { selectedValue, setSelected } = props;
  // @ts-ignore
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <p>
      <select
        style={{
          marginLeft: "6px",
          backgroundColor: "white",
          padding: "8px 4px",
          borderRadius: "0.6rem",
          minWidth: "6rem",
        }}
        value={selectedValue}
        onChange={handleChange}
      >
        {" "}
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>{" "}
      :last weeks
    </p>
  );
};

Filter.defaultProps = {
  selectedValue: "2",
};

export default Filter;
