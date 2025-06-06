const ImageToBase64 = async (image) => {
    const reader = await new FileReader();
    reader.readAsDataURL(image)
    const data = await new Promise ((resolve,reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    return data
}

export default ImageToBase64