import React,{ useState } from 'react';
// import { useState } from 'react';
// import { useState } from 'react';


const NewProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        slug: '',
        category: '請選擇種類',
        image: null,
        price: 0,
        countInStock: 0,
        rating: 1,
        description: '',
        gift_product: null,
        product_package: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(productData);
        // const formData = new FormData();
        // formData.append('name', productData.name);
        // formData.append('slug', productData.slug);
        // formData.append('category', productData.category);
        // formData.append('price', productData.price);
        // formData.append('countInStock', productData.countInStock);
        // formData.append('rating', productData.rating);
        // formData.append('description', productData.description);
        // formData.append('image', productData.image);
        // console.log(formData);

    }

    const handleImageUpload = (e) =>{
        const file = e.target.files[0];
        if (file) {
            setProductData({
                ...productData,
                image: file,
            });
        }
    }
    

    return (
        <div className='container w-newScreen px-4 border rounded-3 bg-white mt-3'>
            <h2 className='text-center'>新增產品</h2>
            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="name" className='form-label'>名稱：</label>
                    <input type="text" id="name" name="name" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="slug" className='form-label'>slug：</label>
                    <input type="text" id="slug" name="slug" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="category" className='form-label'>種類：</label>
                    <select name="category" id="category" className='form-select text-center'
                        onChange={handleInputChange}
                    >
                        <option defaultValue>請選擇種類</option>
                        <option value="饅頭">饅頭</option>
                        <option value="大福">大福</option>
                        <option value="羊羹">羊羹</option>
                        <option value="水饅頭">水饅頭</option>
                        <option value="銅鑼燒">銅鑼燒</option>
                        <option value="禮盒">禮盒</option>
                    </select>
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="image" className='form-label'>照片：</label>
                    <input type="file" id="image" name="image" required className='form-control text-center'
                        onChange={handleImageUpload} accept="image/*"
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="price" className='form-label'>價格：</label>
                    <input type="number" min={0} id="price" name="price" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="countInStock" className='form-label'>庫存：</label>
                    <input type="number" id="countInStock" name="countInStock" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="rating" className='form-label'>Rating：</label>
                    <input type="number" min={1} max={5} id="rating" name="rating" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="description" className='form-label'>描述：</label>
                    <textarea id="description" name="description" required className='form-control'
                        onChange={handleInputChange}
                    />
                </li>
                {/* <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="gift_product" className='form-label'>Gift_Product：</label>
                    <input type="file" id="gift_product" name="gift_product" required className='form-control'
                        onChange={handleImageUpload}
                    />
                </li>
                <li className="d-flex justify-content-between mt-2">
                    <label htmlFor="product_package" className='form-label'>Product_Package：</label>
                    <input type="file" id="product_package" name="product_package" required className='form-control'
                        onChange={handleImageUpload}
                    />
                </li> */}
                <input type="submit" value="確認" className='btn btn-primary mx-auto w-75 m-3'/>
            </form>
        </div>
    );
}

export default NewProduct;
