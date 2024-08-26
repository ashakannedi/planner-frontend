import './Adduser.css';
import { IonIcon } from '@ionic/react';
import { personCircleOutline, mailOutline, lockClosedOutline, callOutline, personOutline } from 'ionicons/icons';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';

function Adduser(){
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
        <div className='User-container' >
            <div className='image-container-item'>
                <img src="Employee.jpg" alt="User From" className="left-image-item" />
            </div>
            <div className="form-items-item">
                <h3 className="form-title-item">User From</h3>
                <form onSubmit={handleSubmit} >
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={personCircleOutline} className="input-icon-item" />
                            <input type="text" 
                            placeholder='Enter Full Name' 
                            id="user" required 
                            className="underline-input-item"
                            onChange={(event)=>{setName(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={mailOutline} className="input-icon-item" />
                            <input type="email" 
                            placeholder='Enter Email' 
                            id="email" required
                             className="underline-input-item"
                             onChange={(event)=>{setEmail(event.target.value)}} />
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={lockClosedOutline} className="input-icon-item" />
                            <input type="password" 
                            placeholder='Password'
                             id="password" required 
                             className="underline-input-item" 
                             onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={lockClosedOutline} className="input-icon-item" />
                            <input type="password" 
                            placeholder='Confirm Password' 
                            id="confirmPassword" required 
                            className="underline-input-item" 
                            onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={callOutline} className="input-icon-item" />
                            <input type="tel" 
                            placeholder='Number' 
                            id="number" 
                            className="underline-input-item"
                            onChange={(event)=>{setMobile(event.target.value)}} />
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={personOutline} className="input-icon-item"  />
                            <select id="role" name="role" required className="underline-input-item"  onChange={(event)=>{setRole(event.target.value)}}>
                            <option value="" disabled hidden
                            selected>Select Role</option>

                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group-item">
                        <div className="input-container-item">
                            <IonIcon icon={personOutline} className="input-icon-item" />
                            <select id="gender" name="gender" required className="underline-input-item" onChange={(event)=>{setGender(event.target.value)}}>
                            <option value="" disabled hidden
                             selected>Select  Gender </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-container-item">
                        <button type="submit" className="btn btn-primary">Register</button>
                    <button type="button" className="btn btn-secondary">SignIn</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Adduser;