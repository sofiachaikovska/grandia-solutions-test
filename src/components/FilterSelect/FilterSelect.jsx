import css from "./FilterSelect.module.css";
import { ConfigProvider, Select, Col } from "antd";

const { Option } = Select;

const FilterSelect = ({
  brandOptions,
  tagOptions,
  setSelectedBrands,
  setSelectedTags,
}) => {
  const theme = {
    token: {
      colorPrimary: "#AEAEFB",
      colorTextPlaceholder: "#AEAEFB",
      fontFamily: "Nunito",
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className={css.filterSelectContainer}>
        <Col className={css.filterSelectColumn}>
          <Select
            className={css.selectInput}
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Brands"
            onChange={(value) => setSelectedBrands(value)}
          >
            {brandOptions.map((brand) => (
              <Option className={css.selectOption} key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Col>
        <Col className={css.filterSelectColumn}>
          <Select
            className={css.selectInput}
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Tags"
            onChange={(value) => setSelectedTags(value)}
          >
            {tagOptions.map((tag) => (
              <Option className={css.selectOption} key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Col>
      </div>
    </ConfigProvider>
  );
};

export default FilterSelect;
