

 const uploadImage =  async (req, res) => {
    const { image } = req.body;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mern_product');

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default uploadImage