import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { BACKEND_URL } from "../App";

const Product = ({ product, getProducts }) => {
    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Do you really want to delete the product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed){
            try {
                await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                toast.success("Delete a product successfully");
                getProducts();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="col">
            <div className="card h-100">
                <img src={product.image} alt={product.image} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">Price: ${product.price}</p>
                </div>
                <div className="container d-flex justify-content-between mb-2">
                    <Link to={`/edit/${product._id}`} type="button" className="btn btn-secondary">Edit</Link>
                    <button onClick={() => deleteProduct(product._id)} type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Product;