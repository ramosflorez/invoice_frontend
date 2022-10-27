import React, { useState, useEffect } from "react";
import "../pages/AddInvoice.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddInvoice = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [clients, setclients] = useState([]);
  const [discount,setdiscount]=useState({
    discount:0,
    subtotal:0,
    total:0
  });
  

  function RenderProducts(item) {
    const quantity = item.quantity;
    const price = item.product.Price;
    const amount = quantity * price;
    const product_name = item.product.Product_name;

    return (
      <tr>
        <td>{product_name}</td>
        <td>${price}.00</td>
        <td>{quantity}</td>
        <td>${amount}</td>
      </tr>
    );
  }
  function Calculation(event) {
    let subtotal = 0;
    let total = 0;
    let discount=0;

    items.forEach((item) => {
      subtotal = subtotal + item.quantity * item.product.Price;
    });

    if (event.target.value!=="") {
        discount=parseInt(event.target.value);
      total = subtotal - (discount / 100) * subtotal;
    } else {
      total = subtotal;
    }
    console.log("total=>", total);
    console.log("discount=>", discount);
    setdiscount({
      subtotal,
      discount,
      total
    })

    
  }
  function Calculation2(list){
    let subtotal = 0;
    let total=0;
    
    list.forEach((item) => {
      subtotal = subtotal + item.quantity * item.product.Price;
    });
    total = subtotal - (discount.discount / 100) * subtotal;

    setdiscount((prev)=>({
      ...prev,
      subtotal,
      total
    }));


  }

  const add = () => {
    const products_select = document.getElementById("produts_select");
    let quantity = parseInt(document.getElementById("product_quantity").value);
    if (isNaN(quantity)) {
      quantity = 0;
    }
    
    if (items.length <= 9) {
      if (products_select.value !== 0 && quantity !== 0) {
        const product = data.find(
          (item) => item.Product_ID == products_select.value
        );
        const same_product = items.find(
          (item) => item.product.Product_ID == products_select.value
        );
        if (quantity !== 0) {
          
          
          if (!same_product) {
            const Products_list=[...items, { product, quantity: quantity }];
            Calculation2(Products_list)
            setItems(Products_list);
          } else {

            const new_product = items.map((item) => {
              if (item.product.Product_ID === same_product.product.Product_ID) {
                return { ...item, quantity: item.quantity + quantity };
              }
              return item;
            });
            Calculation2(new_product);
            setItems(new_product);
          }
          
        }
      } else {
        toast.error(
          "You must select a product and the quantity must be greater than 0."
        );
      }
      
    } else {
      toast.error("You cannot enter more than 10 products");
    }
    
  };

  const save = async (e) => {
    e.preventDefault();
    let subtotal = 0;
    let total = 0;
    let discount = 0;
    let client = parseInt(document.getElementById("clients_select").value);
    let date = document.getElementById("date").value;

    items.forEach((item) => {
      subtotal = subtotal + item.quantity * item.product.Price;
    });

    if (document.getElementById("discount") !== null) {
      discount = parseInt(document.getElementById("discount").value);
      total = subtotal - (discount / 100) * subtotal;
    } else {
      total = subtotal;
    }

    if (
      client !== 0 &&
      items.length !== 0 &&
      date !== "" &&
      subtotal !== 0 &&
      total !== 0
    ) {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}invoice`,
        {
          Client_ID: client,
          date_: date,
          discount: parseInt(document.getElementById("discount").value),
          subtotal: subtotal,
          total: total,
        }
      );
      console.log(response.data);

      const response_product = await axios.post(
        `${process.env.REACT_APP_HOST}details/${response.data}`,
        {
          items: JSON.stringify(items),
        }
      );
      console.log(response_product);

      if (response.status === 200 && response_product.status === 200) {
        toast.success("Successful registration");

        setTimeout(function () {
          window.location.href = `http://localhost:3000/invoices`;
        }, 5000);
      } else {
        toast.error("AN ERROR HAS OCCURRED");
      }
    } else {
      toast.error("You must fill in the fields");
    }
  };

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  const getClients = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}clients`);
    if (response.status === 200) {
      setclients(response.data);
    }
  };

  const getProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}products`);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  function date() {
    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString("en-CA");

    return defaultValue;
  }

  return (
    <div className="invoice_body">
      <form onSubmit={(e) => save(e)}>
        <h1>INVOICE</h1>
        <div className="invoice_info">
          <div className="invoice_info_client">
            <label>
              Date:{" "}
              <input
                id="date"
                type="date"
                name="dateRequired"
                defaultValue={date()}
                max={date()}
                min="2022-01-01"
                onChange={(event) => this.add(event)}
              />
            </label>
            <label>
              Client:{" "}
              <select id="clients_select">
                <option value={0}>Select</option>
                {clients &&
                  clients.map((item, index) => {
                    return (
                      <option key={item.Client_ID} value={item.Client_ID}>
                        {item.Client_name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
        </div>
        <div className="discount_info">
          <label>
            How much will the discount be?{" "}
            <input
              type="number"
              id="discount"
              name="discount"
              min="1"
              max="100"
              onChange={Calculation}
              
            />
          </label>
        </div>
        <div className="invoice_product_add">
          <label>
            Product:{" "}
            <select id="produts_select">
              <option value={0}>Select</option>
              {data &&
                data.map((item, index) => {
                  return (
                    <option key={item.Product_ID} value={item.Product_ID}>
                      {item.Product_name}
                    </option>
                  );
                })}
            </select>
          </label>
          <label>
            Quantity:{" "}
            <input
              type="number"
              id="product_quantity"
              name="product_quantity"
              min="1"
              max="50"
            />
          </label>
        </div>
        <button className="add" onClick={() => add()} type="button">
          ADD
        </button>
        <div className="table_container_">
          <table className="styled-table_" >
            <thead>
              <tr>
                <th style={{ textAling: "center" }}>Product</th>
                <th style={{ textAling: "center" }}>Price</th>
                <th style={{ textAling: "center" }}>Quantity</th>
                <th style={{ textAling: "center" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return RenderProducts(item);
              })}
            </tbody>
          </table>
        </div>
        <div className="calculation"><div></div>
        <div className="container_cal">
            <div className="subtotal_label"><label>SUBTOTAL $</label>
            {discount.subtotal}</div>
            <div className="discont_label"> <label>DISCOUNT </label>
            {discount.discount}<label>%</label></div>
            <div className="total_label"><label>TOTAL $</label>
            {discount.total}</div>
        
      </div></div>
        <button className="save" type="submit">
          SAVE INVOICE
        </button>
      </form>
    </div>
  );
};
export default AddInvoice;
