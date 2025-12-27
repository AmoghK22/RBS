import axios from "axios";

const addItem = async(item)=>{

    return await axios.post("http://localhost:8082/admin/items",item)
}

const fetchItems = async() =>{

    return await axios.get("http://localhost:8082/items");
}


const deleteItems = async(itemId)=>{

    return await axios.delete(`http://localhost:8082/admin/items/${itemId}`);
}