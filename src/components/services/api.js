import axios from "axios";

export const fetchData = async (selectedBrands, selectedTags) => {
  let url = "https://makeup-api.herokuapp.com/api/v1/products.json";
  const params = [];

  if (selectedBrands.length) {
    selectedBrands.forEach((brand) => params.push(`brand=${brand}`));
  }

  if (selectedTags.length) {
    selectedTags.forEach((tag) => params.push(`product_type=${tag}`));
  }

  if (params.length) {
    url += `?${params.join("&")}`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchOptions = async () => {
  try {
    const response = await axios.get(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    );
    const products = response.data;

    const uniqueBrands = [];
    const uniqueTags = [];

    products.forEach((product) => {
      if (product.brand && !uniqueBrands.includes(product.brand)) {
        uniqueBrands.push(product.brand);
      }

      if (product.tag_list && Array.isArray(product.tag_list)) {
        product.tag_list.forEach((tag) => {
          const trimmedTag = tag.trim();
          if (trimmedTag && !uniqueTags.includes(trimmedTag)) {
            uniqueTags.push(trimmedTag);
          }
        });
      }
    });

    return { uniqueBrands, uniqueTags };
  } catch (error) {
    console.error("Error fetching options:", error);
  }
};
