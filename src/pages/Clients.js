import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import axios from "axios";

const Clients=()=>{
    const[data,setData]=useState([]);
        useEffect(()=>{
            getClients();
        },[]);

    const getClients= async()=>{
        const response=await axios.get(`${process.env.REACT_APP_HOST}clients`);
        if(response.status===200){
            setData(response.data);
        }
    }; 

    return(
        <div className="container_all_clients">
            <div className="body">
                <Link to={`/create_invoice`}><button className="btn_clients">New Invoice </button></Link>
                <div className="table_container_clients">
                    <table className="styled-table_clients">
                        <thead>
                            <tr>
                                <th style={{ textAling: "center" }}>No.</th>
                                <th style={{ textAling: "center" }}>Name</th>
                                <th style={{ textAling: "center" }}>Point Of Contact</th>
                                <th style={{ textAling: "center" }}>Phone Number</th>
                                <th style={{ textAling: "center" }}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.Client_ID}</td>
                                        <td>{item.Client_name}</td>
                                        <td>{item.Point_of_Contact}</td>
                                        <td>{item.Phone_number}</td>
                                        <td>{item.Email}</td>
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
export default Clients;