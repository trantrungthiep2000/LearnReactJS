import { useEffect, useState } from "react";
import axios from "axios"
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../App" 

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/products/`);
            console.log(response.data);
            setProducts(response.data);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="container mt-4">
            <div>
                <Link to="/create" type="button" className="btn btn-success">Create a Product</Link>
            </div>
           <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    products.map((product, index) => (
                        <Product key={index} product={product} getProducts={getProducts}></Product>
                    ))
                )}
            </div>
        </div>
    )
}

export default HomePage;