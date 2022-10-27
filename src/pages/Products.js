import React, { useState, useEffect } from "react";
import "../pages/Products.css";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}products`);
    if (response.status === 200) {
      setData(response.data);
    }
  };
  console.log("data=>", data);
  return (
    <div className="container_all">
      <div className="table_container">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAling: "center" }}>No.</th>
              <th style={{ textAling: "center" }}>Product Name</th>
              <th style={{ textAling: "center" }}>Description</th>
              <th style={{ textAling: "center" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Product_ID}</td>
                    <td>{item.Product_name}</td>
                    <td>{item.Product_descr}</td>
                    <td className="price">${item.Price}.00</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Products;
