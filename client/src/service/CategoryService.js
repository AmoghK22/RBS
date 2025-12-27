import axios from "axios";

const addCategory = async(category)=>{

    return await axios.post("http://localhost:8082/admin/categories",category);

}


const fetchCategories = async() =>{

    return await axios.get("http://localhost:8082/categories");
}


const deleteCategory = async(categoryId)=>{

    return await axios.delete(`http://localhost:8082/admin/categories/${categoryId}`);
}