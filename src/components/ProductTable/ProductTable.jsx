import css from "./ProductTable.module.css";
import { ConfigProvider, Table } from "antd";
import { nanoid } from "nanoid";

const ProductTable = ({ data, groupByType, groupByBrand, groupByCategory }) => {
  const columns = [
    {
      title: <span className={css.columnTitle}>Image</span>,
      dataIndex: "image_link",
      key: "image_link",
      render: (text) => <img className={css.productImage} src={text} />,
    },
    {
      title: <span className={css.columnTitle}>Name</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className={css.columnTitle}>Category</span>,
      dataIndex: "category",
      key: "category",
    },
    {
      title: <span className={css.columnTitle}>Brand</span>,
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: <span className={css.columnTitle}>Price</span>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: <span className={css.columnTitle}>Product Type</span>,
      dataIndex: "product_type",
      key: "product_type",
    },
  ];

  const getGroupedData = (data, key) => {
    return data.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };

  let groupedData = data;

  if (groupByType) {
    groupedData = getGroupedData(data, "product_type");
  } else if (groupByBrand) {
    groupedData = getGroupedData(data, "brand");
  } else if (groupByCategory) {
    groupedData = getGroupedData(data, "category");
  }

  const dataSource = Array.isArray(groupedData)
    ? groupedData.map((item) => ({ ...item, key: nanoid() }))
    : Object.keys(groupedData).map((key) => ({
        key: nanoid(),
        name: key,
        children: groupedData[key].map((item) => ({ ...item, key: nanoid() })),
      }));

  const theme = {
    token: {
      colorPrimary: "#AEAEFB",
      colorText: "#000000",
      colorBorderSecondary: "#AEAEFB",
      fontFamily: "Nunito",
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <Table
        className={css.productTable}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: false,
          style: {
            display: "flex",
            justifyContent: "center",
          },
        }}
      />
    </ConfigProvider>
  );
};

export default ProductTable;
