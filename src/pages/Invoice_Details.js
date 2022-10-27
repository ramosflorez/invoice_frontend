import React, { useState, useEffect } from "react";
import "../pages/Invoice_Details.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDetails();
  }, []);
  const id = useParams();
  const getDetails = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}details/${parseInt(id.invoice_id)}`
    );
    if (response.status === 200) {
      setData(response.data);
      console.log("DETALLES=>", response.data);
    }
  };

  const [invoice, setinvoice] = useState([
    {
      Invoice_ID: 0,
      Client_name: "",
      date_: "",
      subtotal: 0,
      discount: 0,
      total: 0,
    },
  ]);
  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}invoice_one/${parseInt(id.invoice_id)}`
    );
    if (response.status === 200) {
      setinvoice(response.data);
    }
    console.log("factura", response.data);
  };

  return (
    <div className="invoice_body">
      <div className="form">
        <h1>INVOICE</h1>
        <div className="invoice_info">
            <label>No Invoice {invoice[0].Invoice_ID}</label>
          <div className="invoice_info_client">
            <label>Date:{invoice[0].date_}</label>
            <label>Client:{invoice[0].Client_name}</label>
          </div>
        </div>

        <div className="table_container_Details">
          <table className="styled-table_Details">
            <thead>
              <tr>
                <th style={{ textAling: "center" }}>Product</th>
                <th style={{ textAling: "center" }}>Price</th>
                <th style={{ textAling: "center" }}>Quantity</th>
                <th style={{ textAling: "center" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.Product_name}</td>
                      <td>${item.Price}.00</td>
                      <td>{item.Quantity}</td>
                      <td>${item.Total}.00</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="calculation_">
          <label>SUBTOTAL ${invoice[0].subtotal}.00</label>
          <label>DISCOUNT {invoice[0].discount}%</label>
          <label>TOTAL ${invoice[0].total}</label>
        </div>
      </div>
    </div>
  );
};
export default Details;
