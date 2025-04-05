
// import dotenv from 'dotenv'
// dotenv.config()
const url = import.meta.env.VITE_CLOUDINARY_URL

const UploadImage = async(image) => {
    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset','mern_product')
    const dataResponse = await fetch(url,{
        method:'post',
        body:formData
    })

    return dataResponse.json()
}

export default UploadImage