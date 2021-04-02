import React from 'react';
import ModalConfirm from "../_components/ModalConfirm";
import {Spinner} from "react-bootstrap";

const ProductTable = ({products, deleteProduct}) => {
    if (!products) {
        return <div className={'text-center text-primary'}>
            <Spinner animation="border"/>
            <p>Please wait...s</p>
        </div>;
    }
    return (
        <table className="table table-hover">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope={"col"}>Status</th>
                <th scope={"col"}>Action</th>
            </tr>
            {products.length>0 ? products.map((product, index) => <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}.00</td>
                <td>{product.image}</td>
                <td>
                    <button className={'btn btn-sm btn-info'}>Inactive</button>
                </td>
                <td>
                    <ModalConfirm deleteProduct={deleteProduct} id={product.id}/>
                    <button className={"btn btn-sm btn-primary"}>Edit</button>
                </td>
            </tr>) : <tr>
                <td colSpan={6}>
                    <div className={'py-1 text-center text-info text-sm border-bottom'}>
                        Products not available.
                    </div>
                </td>
            </tr>}
        </table>
    );
}

export default ProductTable;
