import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { api } from '../utilities'
import { options } from '../utilities'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Webcam from 'react-webcam'

const Signup = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const urlRef = useRef(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const videoConstraints = {
    width: 1280,
    height: 700,
    facingMode: 'user',
  }
  const webcamRef = useRef(null)

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
    setImage(imageSrc)
    // uploadProfilepic()
  }

  const uploadProfilepic = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'Instafam')
    data.append('cloud_name', 'abcd1234huy')
    fetch('https://api.cloudinary.com/v1_1/abcd1234huy/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        urlRef.current = data.url
        Fielddata()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const Fielddata = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid Email', classes: '#43a047 red darken-1' })
      return
    }
    if (isAdmin) {
      fetch(api.BASE_URL + api.FACULTY_SIGNUP_URL, {
        method: 'post',
        headers: options,
        body: JSON.stringify({
          name,
          password,
          email,
          photoUrl: urlRef.current,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#e53935 red darken-1' })
          } else {
            M.toast({ html: data.message, classes: '#43a047 green darken-1' })
            history.push('/signin')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      fetch(api.BASE_URL + api.STUDENT_SIGNUP_URL, {
        method: 'post',
        headers: options,
        body: JSON.stringify({
          name,
          password,
          email,
          photoUrl: urlRef.current,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#e53935 red darken-1' })
          } else {
            M.toast({ html: data.message, classes: '#43a047 green darken-1' })
            history.push('/signin')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const PostData = () => {
    if (image) {
      uploadProfilepic()
    } else {
      Fielddata()
    }
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '4' }} className='mycard'>
        <div className='card auth-card input-field'>
          <h2 className='instafamheading'>V-meet</h2>
          <input
            type='text'
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid
            item
            xs={12}
            md={12}
            spacing={1}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <Grid item style={{ margin: '1rem' }}>
              {' '}
              Student
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  size='small'
                  color='none'
                  onChange={() => setIsAdmin(!isAdmin)}
                  name='isAdmin'
                />
              }
            />
            <Grid item style={{ marginTop: '1rem' }}>
              Faculty
            </Grid>
          </Grid>

          <div className='file-field input-field'>
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              onClick={() => capture()}
            >
              capture from webcam
            </button>
            <div className='file-path-wrapper'>
              {image === '' ? (
                <></>
              ) : (
                <img height='50px' width='50px' src={image}></img>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              onClick={() => PostData()}
            >
              SignUp
            </button>
          </div>

          <h5>
            <Link to='/signin'>Already have an account ?</Link>
          </h5>
        </div>
      </div>

      <div>
        <Webcam
          audio={false}
          height={120}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={120}
          videoConstraints={videoConstraints}
        />
      </div>
    </div>
  )
}

export default Signup
