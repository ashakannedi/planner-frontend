import './Registration.css';
import { IonIcon } from '@ionic/react';
import { personCircleOutline, mailOutline, lockClosedOutline, callOutline, personOutline } from 'ionicons/icons';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';


export default function Registration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {  // Type 'event' as React.FormEvent
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop further execution
        }
        try {
            const response = await axios.post("http://localhost:8080/userdetails/register", {
                name,
                email,
                password,
                mobile,
                role,
                gender
            });
            console.log("Response data:", response.data); // Log the response data
            alert("User Registration Successfully");

            // Reset the form fields
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setMobile("");
            setRole("");
            setGender("");
        } catch (err: any) {  // Type 'err' as 'any'
            console.error("Error during registration:", err.response ? err.response.data : err.message); // Log the error
            alert("User Registration Failed");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='registration-container' >
            <div className='image-container'>
                <img src="FourGID.jpg" alt="Registration" className="left-image" />
            </div>
            <div className="form-items">
                <h3 className="form-title">Registration</h3>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personCircleOutline} className="input-icon" />
                            <input type="text" 
                            placeholder='Enter Full Name' 
                            id="user" required 
                            className="underline-input"
                            onChange={(event)=>{setName(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={mailOutline} className="input-icon" />
                            <input type="email" 
                            placeholder='Enter Email' 
                            id="email" required
                             className="underline-input"
                             onChange={(event)=>{setEmail(event.target.value)}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <input type="password" 
                            placeholder='Password'
                             id="password" required 
                             className="underline-input" 
                             onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={lockClosedOutline} className="input-icon" />
                            <input type="password" 
                            placeholder='Confirm Password' 
                            id="confirmPassword" required 
                            className="underline-input" 
                            onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={callOutline} className="input-icon" />
                            <input type="tel" 
                            placeholder='Number' 
                            id="number" 
                            className="underline-input"
                            onChange={(event)=>{setMobile(event.target.value)}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personOutline} className="input-icon"  />
                            <select id="role" name="role" required className="underline-input"  onChange={(event)=>{setRole(event.target.value)}}>
                            <option value="" disabled hidden
                            selected>Select Role</option>

                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <IonIcon icon={personOutline} className="input-icon" />
                            <select id="gender" name="gender" required className="underline-input" onChange={(event)=>{setGender(event.target.value)}}>
                            <option value="" disabled hidden
                             selected>Select  Gender </option>
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
