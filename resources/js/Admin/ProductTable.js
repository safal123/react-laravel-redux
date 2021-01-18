import React from 'react';

const ProductTable = ({products}) =>{
    return(
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope={"col"}>Status</th>
                <th scope={"col"}>Action</th>
            </tr>
            </thead>
            <tbody>
            {products && products.map((product, index) => <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}.00</td>
                <td>{product.image}</td>
                <td>
                    <button className={'btn btn-sm btn-info'}>Inactive</button>
                </td>
                <td>
                    <button className={"btn btn-sm btn-danger"}>Remove</button>
                    <button className={"btn btn-sm btn-primary"}>Edit</button>
                </td>
            </tr>)}
            </tbody>
        </table>
    );
}

export default ProductTable;
