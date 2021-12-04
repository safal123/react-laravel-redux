import React from 'react';
import ModalConfirm from "../_components/ModalConfirm";
import {Spinner} from "react-bootstrap";
import SmallSpinner from "../_components/SmallSpinner";

const ProductTable = ({products, deleteProduct, makeProductActive, isLoading}) => {
    return (
        <div className={"vw-100"}>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? products.map((product, index) => <tr key={index}>
                    <td><input type="checkbox"/></td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}.00</td>
                    <td>
                        <img
                            src={ product.image_url}
                            alt={product.name}
                            className={'img-thumbnail'}
                            height={'100'}
                            width={'100'}
                        />
                    </td>
                    <td>
                        <a className={'p-4 text-white text-muted'}>
                            <select onChange={() =>makeProductActive(product.id)} className={'text-muted px-4'} name="status" value={product.is_active} id="status">
                              <option value='true'>Active</option>
                              <option value='false'>Inactive</option>
                            </select>
                          {isLoading && product.id ? <SmallSpinner text={"Please wait.."}/>:""}
                        </a>
                    </td>
                    <td>
                        <ModalConfirm deleteProduct={deleteProduct} id={product.id}/>
                        <button className={"btn btn-sm btn-primary"}>Edit</button>
                    </td>
                </tr>) : <tr>
                    <td colSpan={7}>
                        <div className={'py-1 text-center text-info text-sm border-bottom'}>
                            Products not available.
                        </div>
                    </td>
                </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
