// import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Transition from '../Transition';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function Products() {
    // 顯示會員資料 用空陣列接json
    const [products, setProducts] = useState([]);
    // 編輯會員資料
    const [editedProducts, setEditedProducts] = useState(null);
    // 翻頁功能
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/products",
                    JSON.stringify({ }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                // console.log(response.data);
                setProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 編輯按鈕
    const handleEditClick = (products) => {
        setEditedProducts({ ...products });
    };
    // 在modal裡面修改資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProducts((prevproducts) => ({
            ...prevproducts,
            [name]: value,
        }));
    };

    // 紀錄頁數
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Transition>
            <div className="container text-center px-4 border rounded-3 bg-white mt-3">
                <div className="pagination btn-group w-25 my-2 ms-auto">
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className="btn btn-success">
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className="row">
                    
                    <table className="col table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名稱</th>
                                <th>slug</th>
                                <th>種類</th>
                                <th>照片</th>
                                <th>價格</th>
                                <th>庫存</th>
                                <th>瀏覽數</th>
                                <th>rating</th>
                                <th>編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((products, index) => (
                            // {products.map((products, index) => (
                                <tr key={index}>
                                    <td className="align-middle">{products._id}</td>
                                    <td className="align-middle">{products.name}</td>
                                    <td className="align-middle">{products.slug}</td>
                                    <td className="align-middle">{products.category}</td>
                                    <td className="align-middle">
                                        <img src={products.image} alt={products.name} style={{ maxWidth: '50px' }} />
                                    </td>
                                    <td className="align-middle">{products.price}</td>
                                    <td className="align-middle">{products.countInStock}</td>
                                    <td className="align-middle">{products.numReviews}</td>
                                    <td className="align-middle">{products.rating}</td>
                                    <td>
                                        <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => handleEditClick(products)}>
                                            編輯
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*  下面開始是modal */}
            <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Display the selected products's data in the modal */}
                        {editedProducts && (
                            <form 
                                className="form-control d-flex flex-column justify-content-center w-modal mx-auto list-unstyled gap-2"
                                id="editproducts"
                            >
                                <p>ID： {editedProducts._id}</p>
                                <li className="d-flex justify-content-between">
                                    <label htmlFor="name">名稱：</label>
                                    <input type="text" id="name" name="name" required value={editedProducts.name} onChange={handleInputChange} />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <label htmlFor="slug">slug：</label>
                                    <input type="text" id="slug" name="slug" required value={editedProducts.slug} onChange={handleInputChange} />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <label htmlFor="category">種類：</label>
                                    <input type="text" id="category" name="category" required value={editedProducts.category} onChange={handleInputChange} />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <label htmlFor="price">價格：</label>
                                    <input type="text" id="price" name="price" required value={editedProducts.price} onChange={handleInputChange} />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <label htmlFor="countInStock">庫存：</label>
                                    <input type="text" id="countInStock" name="countInStock" required value={editedProducts.countInStock} onChange={handleInputChange} />
                                </li>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <input type="submit" value="確認" className="btn btn-success" form="editproducts"/>
                        <button type="button"  className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    </div>
                    </div>
                </div>
            </div>
            </>
        </Transition>
    )
}

export default Products