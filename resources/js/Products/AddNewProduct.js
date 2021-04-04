import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {connect} from 'react-redux';
import api from "../_helpers/api";
import SmallSpinner from "../_components/SmallSpinner";
import {history} from "../_helpers";
import {logout} from "../_actions/authActions";
import {Link} from "react-router-dom";
import {success} from "../_actions/alert.action";

const AddNewProduct = ({logout, success}) => {
    const {register, handleSubmit, errors} = useForm();
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const fileInput = React.createRef();

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const onsubmit = data => {
        setIsLoading(true);
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }
        fd.append(
            "image",
            image
        );
        api().post('/products', fd)
            .then(res => {
                setIsLoading(false);
                success("Product added successfully.");
                history.push('/admin');
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    logout();
                }
            })
    }
    return (
        <div className={'container mt-2'}>
            <div className={'card'}>
                <div className={'card-header d-flex justify-content-between'}>
                    Add new product
                    <Link to={"/admin"} className={'bg-primary text-white py-1 px-2 text-sm'}>View All Products</Link>
                </div>
                <div className={'card-body'}>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className={'form-group'}>
                            <label htmlFor="name">Product name</label>
                            <input
                                type="text"
                                name={'name'}
                                ref={register({required: "Name field is required."})}
                                placeholder={'Iphone 12 Pro Max'}
                                className={'form-control'}/>
                            {errors.name &&
                            <span className={'text-danger'}>
                                    {errors.name.message}
                                </span>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="price">Product price</label>
                            <input
                                name={'price'}
                                ref={register({required: "Price field is required."})}
                                type={'number'}
                                // required
                                placeholder={'$1,000,000.00'}
                                className={'form-control'}/>
                            {errors.price &&
                            <span className={'text-danger'}>
                                    {errors.price.message}
                                </span>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="description">Product description</label>
                            <textarea
                                name={'description'}
                                className={'form-control'}
                                // required/
                                ref={register({required: "Description field is required."})}
                                placeholder={'Product description'}>
                            </textarea>
                            {errors.description &&
                            <span className={'text-danger'}>
                                    {errors.description.message}
                                </span>
                            }
                        </div>
                        <div className={'form-group'}>
                            {/*<label htmlFor="image">Product Image</label>*/}
                            <input
                                type='file'
                                name={'product_image'}
                                ref={fileInput}
                                onChange={changeHandler}
                            />
                        </div>
                        <button type={'submit'} className={'btn btn-primary'} disabled={isLoading}>
                            {isLoading ? <SmallSpinner text={'Please wait..'}/> :
                                'Create new product'
                            }
                        </button>
                        <button className={'btn btn-info ml-2'}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {logout, success})(AddNewProduct);
