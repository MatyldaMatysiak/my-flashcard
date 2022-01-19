import React from "react";
import UserImage from "../../images/user_image.jpg"
import './_header.scss';

export default function Header() {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="logo">
                        <p className="logo__text">MyFlashcards</p>
                    </div>
                    <div className="user">
                        <p className="user__name">Hi Name!</p>
                        <img src={UserImage} alt="user" className="user__image"/>
                    </div>
                </div>
            </div>

        </header>
    )
}