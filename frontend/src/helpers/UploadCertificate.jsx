const url = import.meta.env.VITE_CLOUDINARY_URL

const UploadCertificate = async(image) => {
    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset','mern_product')
    const dataResponse = await fetch(url,{
        method:'post',
        body:formData
    })

    return dataResponse.json()
}

export default UploadCertificate