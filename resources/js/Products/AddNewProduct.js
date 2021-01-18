import React from 'react';
import {useForm} from "react-hook-form";
import api from "../_helpers/api";
import { history } from "../_helpers";

const AddNewProduct = () => {
    const {register, handleSubmit, errors} = useForm();

    const onsubmit = data => {
        console.log(data);
        api().post('/products', data).then(res =>{
            history.push('/admin');
        }).catch(error =>{
            alert('Something went wrong.')
        })
    }
    return (
        <div className={'container mt-2'}>
            <div className={'card'}>
                <div className={'card-header'}>
                    Add new product
                </div>
                <div className={'card-body'}>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className={'form-group'}>
                            <label htmlFor="name">Product name</label>
                            <input
                                type="text"
                                name={'name'}
                                required
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
                                ref={register({required: "Cool phone."})}
                                type={'number'}
                                required
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
                                required
                                ref={register({required: "Description field is required."})}
                                placeholder={'Product description'}>
                            </textarea>
                            {errors.description &&
                            <span className={'text-danger'}>
                                    {errors.description.message}
                                </span>
                            }
                        </div>
                        <button type={'submit'} className={'btn btn-primary'}>Create new product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewProduct;
