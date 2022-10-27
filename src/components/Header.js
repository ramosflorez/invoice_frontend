import React, {useEffect,useState} from 'react';
import{Link,useLocation} from "react-router-dom";
import "./Header.css";
import { FaBars } from "react-icons/fa";

const Header = () => {
    const[activeTab,setActiveTab]=useState("Clients");
    const location=useLocation();
    useEffect (()=>{
        if(location.pathname==="/clients"){
            setActiveTab("Clients");
        }else if(location.pathname==="/products"){
            setActiveTab("Products");
        }else if(location.pathname==="/invoices"){
            setActiveTab("Invoices");
        }
    },[location] )

  return (
    <header>
        <div class="image-container">
            <img loading="lazy" width="241" height="54" src="https://aimedgeapps.com/wp-content/uploads/2021/12/Captura-de-pantalla-2021-12-15-131916.jpg" alt="" />
        </div>
        
        <div className='options'>
            <Link to="/clients">
                <p className={`${activeTab==="Clients" ? "active":""}`} onClick={()=>setActiveTab("Clients")}>CLIENTS</p>
            </Link>
            <Link to="/products">
                <p className={`${activeTab==="Products" ? "active":""}`} onClick={()=>setActiveTab("Products")}>PRODUCTS</p>
            </Link>
            <Link to="/invoices">
                <p className={`${activeTab==="Invoices" ? "active":""}`} onClick={()=>setActiveTab("Invoices")}>INVOICES</p>
            </Link>
        </div>

    </header>

  )
}

export default Header;