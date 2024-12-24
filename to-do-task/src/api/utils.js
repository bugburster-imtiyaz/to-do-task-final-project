import axios from "axios";

// Todo: upload image in imageBB
export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?&key=35ab21cfcf5a5c86d3596691251f17f1`,
        formData
    );
    return data;
};