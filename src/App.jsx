import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import GroupSwitch from "./components/GroupSwitch/GroupSwitch";
import FilterSelect from "./components/FilterSelect/FilterSelect";
import ProductTable from "./components/ProductTable/ProductTable";
import { fetchData, fetchOptions } from "./components/services/api";

function App() {
  const [data, setData] = useState([]);
  const [groupByType, setGroupByType] = useState(false);
  const [groupByBrand, setGroupByBrand] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData(selectedBrands, selectedTags);
      setData(data);
    };

    fetchDataAsync();
  }, [selectedBrands, selectedTags]);

  useEffect(() => {
    const fetchOptionsAsync = async () => {
      const { uniqueBrands, uniqueTags } = await fetchOptions();

      setBrandOptions(uniqueBrands);
      setTagOptions(uniqueTags);
    };

    fetchOptionsAsync();
  }, []);

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <GroupSwitch
          groupByType={groupByType}
          setGroupByType={setGroupByType}
          groupByBrand={groupByBrand}
          setGroupByBrand={setGroupByBrand}
          groupByCategory={groupByCategory}
          setGroupByCategory={setGroupByCategory}
        />
      </Row>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <FilterSelect
          brandOptions={brandOptions}
          tagOptions={tagOptions}
          setSelectedBrands={setSelectedBrands}
          setSelectedTags={setSelectedTags}
        />
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProductTable
            data={data}
            groupByType={groupByType}
            groupByBrand={groupByBrand}
            groupByCategory={groupByCategory}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
