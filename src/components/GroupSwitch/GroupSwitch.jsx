import css from "./GroupSwitch.module.css";
import { ConfigProvider, Col, Switch } from "antd";

const GroupSwitch = ({
  groupByType,
  setGroupByType,
  groupByBrand,
  setGroupByBrand,
  groupByCategory,
  setGroupByCategory,
}) => {
  const handleTypeChange = (checked) => {
    setGroupByType(checked);
    if (checked) {
      setGroupByBrand(false);
      setGroupByCategory(false);
    }
  };

  const handleBrandChange = (checked) => {
    setGroupByBrand(checked);
    if (checked) {
      setGroupByType(false);
      setGroupByCategory(false);
    }
  };

  const handleCategoryChange = (checked) => {
    setGroupByCategory(checked);
    if (checked) {
      setGroupByType(false);
      setGroupByBrand(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7878C3",
        },
      }}
    >
      <div className={css.groupSwitchContainer}>
        <Col className={css.groupSwitchColumn}>
          <Switch
            className={css.switchOption}
            checked={groupByType}
            onChange={handleTypeChange}
          />
          <span className={css.switchOptionLabel}>Group by Type</span>
        </Col>
        <Col className={css.groupSwitchColumn}>
          <Switch
            className={css.switchOption}
            checked={groupByBrand}
            onChange={handleBrandChange}
          />
          <span className={css.switchOptionLabel}>Group by Brand</span>
        </Col>
        <Col className={css.groupSwitchColumn}>
          <Switch
            className={css.switchOption}
            checked={groupByCategory}
            onChange={handleCategoryChange}
          />
          <span className={css.switchOptionLabel}>Group by Category</span>
        </Col>
      </div>
    </ConfigProvider>
  );
};

export default GroupSwitch;
