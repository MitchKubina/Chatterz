import {useState} from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();
        const {data} = await axios.post('/register', {username, password});
    }

    return (
        <div className = "bg-sky-200 h-screen flex items-center">
            <form className = "w-64 mx-auto mb-12" onSubmit = {register}>
                <input value = {username} 
                    onChange = {ev => setUsername(ev.target.value)}
                    type = "text" placeholder = "username" 
                    className = "block w-full rounded-sm p-2 mb-1"/>
                <input value = {password} 
                    onChange = {ev => setPassword(ev.target.value)}
                    type = "password" placeholder = "password" 
                    className = "block w-full rounded-sm p-2 mb-1"/>
                    <button className = "bg-sky-400 border-solid border-black text-white block w-full rounded-sm p-2">Register</button>
            </form>
        </div>
    );
}