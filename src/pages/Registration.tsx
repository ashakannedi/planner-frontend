import React,{useEffect, useState} from 'react';
import './Registration.css';
import { IonIcon } from '@ionic/react';
import { personCircleOutline, mailOutline, lockClosedOutline, callOutline, personOutline } from 'ionicons/icons';

export default function Registration() {
    return (
        <div className='registration-container' >
            <div className='image-container'>
                <img src="FourGID.jpg" alt="Registration" className="left-image" />
            </div>
            <div className="form-items">
                <h3 className="form-title">Registration</h3>
                <form>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personCircleOutline} className="input-icon" />
                            <input type="text" placeholder='Enter Full Name' id="user" required className="underline-input" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={mailOutline} className="input-icon" />
                            <input type="email" placeholder='Enter Email' id="email" required className="underline-input" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <input type="password" placeholder='Password' id="password" required className="underline-input" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <input type="password" placeholder='Confirm Password' id="confirmPassword" required className="underline-input" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={callOutline} className="input-icon" />
                            <input type="tel" placeholder='Number' id="number" className="underline-input" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personOutline} className="input-icon" />
                            <select id="role" name="role" required className="underline-input">
                            <option value="" disabled hidden selected>Select Role</option>

                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personOutline} className="input-icon" />
                            <select id="gender" name="gender" required className="underline-input">
                            <option value="" disabled hidden selected>Select  Gender </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <button type="button" className="btn btn-secondary">SignIn</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
