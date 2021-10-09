import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'

function Verification() {
  const videoConstraints = {
    width: 1280,
    height: 700,
    facingMode: 'user',
  }
  const webcamRef = useRef(null)

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
    call(imageSrc)
  }

  const postDetails = async (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'Instafam')
    data.append('cloud_name', 'abcd1234huy')
    let response = await axios.post(
      'https://api.cloudinary.com/v1_1/abcd1234huy/image/upload',
      data
    )
    return response.data.url
  }

  async function call(image) {
    const imgSrc = await postDetails(image)
    let value = await axios.post(
      'http://ec2-18-188-117-109.us-east-2.compute.amazonaws.com/api/distance',
      {
        first: imgSrc,
        second:
          'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg',
      }
    )

    if (parseFloat(value.data.distance) > 0.7) {
      window.location.href = '/abcd'
    } else {
      console.log('flase')
    }
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1> Capture your video for verification </h1>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={1280}
          videoConstraints={videoConstraints}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={capture}>Capture</button>
      </div>
    </>
  )
}

export default Verification
