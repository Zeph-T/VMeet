import React, { useRef,useContext } from 'react'
import { useParams } from "react-router-dom";
import Webcam from 'react-webcam'
import axios from 'axios'
import {UserContext} from '../App'
import M from "materialize-css";

function Verification() {
  const { subjectId } = useParams(); 
  const {state,dispatch} = useContext(UserContext)
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
          state.photoUrl
      }
    )
    console.log(value.data.distance);
    if (parseFloat(value.data.distance) < 1.3) {
      M.toast({
        html: "Face Recognition Successfull!",
        classes: "#43a047 green darken-1",
    });
      window.location.href = '/join/'+ subjectId
    } else {
      M.toast({ html: "Face does NOT match!", classes: "#43a047 red darken-1" });
      console.log('false')
    }
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2> Capture your video for verification </h2>
        <Webcam
          audio={false}
          height={600}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={1000}
          videoConstraints={videoConstraints}
        />
      </div>
      <div style={{ textAlign: 'center', }}>
        <button className='btn' onClick={capture} style={{margin:'1rem',backgroundColor:'#091353',color:'white'}}><b>Capture</b></button>
      </div>
    </>
  )
}

export default Verification
