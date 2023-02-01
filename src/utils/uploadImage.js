// UPLOAD IMAGE FUNCTION
async function uploadImage(images){
    const imgArray = []
  
    for (const item of images) {
      const form = new FormData()
      form.append('file', item) 
  
      form.append("upload_preset", "pfzbhxff")
      form.append("cloud_name","duw8ofcok")
  
      const res = await fetch("https://api.cloudinary.com/v1_1/duw8ofcok/upload",{method:"post",body: form})
      const data = await res.json()
      
      imgArray.push({ public_id:data.public_id , url: data.secure_url, name : item.name, size : item.size })
    }
  
    return imgArray
  }
  
  export { uploadImage }