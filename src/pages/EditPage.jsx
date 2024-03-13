import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../App";

const EditPage = () => {
    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    });
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
            setProduct({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image
            });
            setIsLoading(false);

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const saveProduct = async (e) => {
        e.preventDefault();

        if(product.name === "" || product.quantity === "" || product.price === "" || product.image === ""){
            toast.error("Please fill out all input completely");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.put(`${BACKEND_URL}/api/products/${id}`, product);
            toast.success(`Save ${response.data.name} successfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <div className="container">
             <div className="d-flex justify-content-center">
                <h2 className="text-white">
                    Edit a product
                </h2>
            </div>
            <form onSubmit={saveProduct} className="row g-3 needs-validation" novalidate>
                <div className="col-12">
                    <label className="form-label">Image</label>
                    <input type="text" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} className="form-control" placeholder="Enter image"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Name Product</label>
                    <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="form-control" placeholder="Enter name"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input type="number" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} className="form-control" placeholder="Enter quantity"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Price</label>
                    <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="form-control" placeholder="Enter price"/>
                </div>
                <div className="col-12">
                    {!isLoading && (<button className="btn btn-success" type="submit">Save</button>)}
                </div>
            </form>
        </div>
    )
}

export default EditPage;