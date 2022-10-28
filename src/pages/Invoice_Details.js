import React, { useState, useEffect } from "react";
import "../pages/Invoice_Details.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState([]);

  const id = useParams();
  const getDetails = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}details/${parseInt(id.invoice_id)}`
    );
    if (response.status === 200) {
      setData(response.data);

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


  const getInvoice = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}invoice_one/${parseInt(id.invoice_id)}`
    );
    if (response.status === 200) {
      setinvoice(response.data);
    }

  };
  useEffect(() => {
    getInvoice();
    getDetails();
  });

  return (
    <div className="invoice_body">
      <div className="form">
        <div className="company-info">
        <h1 className="title">INVOICE</h1>
        <img loading="lazy" width="241" height="54" src="https://aimedgeapps.com/wp-content/uploads/2021/12/Captura-de-pantalla-2021-12-15-131916.jpg" alt="" className="img-logo"/>
        </div>
       
        <div className="invoice-info">
        <div className="invoice_info_client_details">
            <h4 className="Subtitle">Bill To:</h4>
            <label>{invoice[0].Client_name}</label>
          </div>
          <div className="invoice-details_">
            <h4 className="Subtitle">Invoice Details</h4>
            <div className="text">
              <label>Date:{invoice[0].date_}</label>
              <label>Invoice No. {invoice[0].Invoice_ID}</label>
            </div>

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
