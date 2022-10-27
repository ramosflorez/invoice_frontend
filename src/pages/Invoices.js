import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import "../pages/invoices.css";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";

const Invoices=()=>{
    const[data,setData]=useState([]);
    useEffect(()=>{
        getClients();
    },[]);

const getClients= async()=>{
    const response=await axios.get(`${process.env.REACT_APP_HOST}invoice`);
    if(response.status===200){
        setData(response.data);
    }
}; 
console.log("data=>",data);  
    return(
        <div className="container_all">
            <div className="body_invoices">
            <Link to={`/create_invoice`}><button className="btn">New Invoice </button></Link>
        <div className="table_container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAling: "center" }}>No.</th>
                        <th style={{ textAling: "center" }}>Client</th>
                        <th style={{ textAling: "center" }}>Date</th>
                        <th style={{ textAling: "center" }}>Subtotal</th>
                        <th style={{ textAling: "center" }}>Discount</th>
                        <th style={{ textAling: "center" }}>Total</th>
                        <th style={{ textAling: "center" }}>View</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.Invoice_ID}</td>
                                <td>{item.Client_name}</td>
                                <td>{item.date_}</td>
                                <td>${item.subtotal}.00</td>
                                <td>{item.discount}%</td>
                                <td>${item.total}</td>
                                <td><Link to={`/invoiceDetails/${item.Invoice_ID}`}><FaRegEye /></Link></td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
            </div>
       
        </div>
    )
}
export default Invoices;