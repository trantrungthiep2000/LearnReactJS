import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../App";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();

        if(name === "" || quantity === "" || price === "" || image === ""){
            toast.error("Please fill out all input completely");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/products/`, {name: name, quantity: quantity, price: price, image: image});
            toast.success(`Save ${response.data.name} successfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h2 className="text-white">
                    Create a product
                </h2>
            </div>
            <form onSubmit={saveProduct} className="row g-3 needs-validation" novalidate>
                <div className="col-12">
                    <label className="form-label">Image</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-control" placeholder="Enter image"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Name Product</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter name"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Enter quantity"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Enter price"/>
                </div>
                <div className="col-12">
                    {!isLoading && (<button className="btn btn-success" type="submit">Save</button>)}
                </div>
            </form>
        </div>
    )
}

export default CreatePage;