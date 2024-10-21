import { default as axios } from 'axios'

// Replace these values with your Cloudinary account details
const cloudName = 'dxkxqhmgm'
const uploadPreset = 'vmikubgf'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function uploadToCloudinary(imageFile: any) {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', uploadPreset) // Optional: Replace with your upload preset name if you have one

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
        //   auth: {
        //     username: apiKey,
        //     password: apiSecret,
        //   },
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`Upload Progress: ${progress}%`)
        }
      }
    )

    // The image URL is available in the response data
    const imageUrl = response.data.secure_url
    console.log('Image uploaded to Cloudinary:', imageUrl)
    return imageUrl
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message)
    throw error
  }
}

export default uploadToCloudinary
