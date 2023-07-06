import axios from "axios";

export const createProduct = async(product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });

export const find = async(authtoken) => {
    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/product/find`, {
            headers: {
                authtoken,
            }
        });

        return response.data;

    } catch (error) {
        return error.message;
    }
};

export const removeProduct = async(slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const getProductsByCount = async(count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProduct = async(slug) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
    return response.data;
}

export const updateProduct = async(slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });


export const fetchProductsByFilter = async(arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

export const productStar = async(productId, star, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`, { star }, {
            headers: {
                authtoken,
            },
        }
    );