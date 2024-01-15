import React from 'react'
import './style.css'
import Img_profile from './img-profile.png'

function AddComment({ userData }) {
  return (
    <>
    <div className="comments-section">
        <img className="profile-img" src={Img_profile} alt="Foto de Perfil" /><span style={{ marginLeft: '10px'}}>{userData.username}</span>
        
        <form className="comment-form">
            <textarea id="comment-text" placeholder="Digite seu comentário"></textarea>
            <button type="button">VIPost</button>
        </form>

    </div>
    </>
  )
}

export default AddComment