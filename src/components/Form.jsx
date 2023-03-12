import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Input from "./Input";
import Chat from "./Chat";
import { chatStripe } from "./Chat";

function Form() {

    
    

    // Making Loader 
    let loadInterval;
    function loader(element) {
        element.textContent = "";
        
        loadInterval = setInterval(()=>{
            element.textContent += ".";
            if (element.textContent === "...."){
                element.textContent = "";
            }
        },300);
    };


    // Text typed by the AI 
    function typeText(element,text) {
        let index = 0

        let interval = setInterval(() => {
            if(index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
            } else {
                clearInterval(interval);
            }
        },20);
    };


    // Unique Id for every single message from AI 
    function generateUniqueId() {
        const timeStamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);

        return `id-${timeStamp}-${hexadecimalString}`;
    };


    const handleClick = async (element) => {
        element.preventDefault()

        const form = document.querySelector("form")
        const chatContainer = document.querySelector("#chat_container")
        

        // Getting data from Form 
        var data = new FormData(form)


        // user text 
        chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
        
        
        // AI text 
        const uniqueId = generateUniqueId();
        chatContainer.innerHTML += chatStripe(true," ",uniqueId);


        // Reseting the form 
        form.reset()

        chatContainer.scrollTop = chatContainer.scrollHeight;
        

        const messageDiv = document.getElementById(uniqueId);
        
        loader(messageDiv)

        // fetch data from the server
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: data.get("prompt")
            })
        })

        clearInterval(loadInterval);
        messageDiv.innerHTML = "";

        if(response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim();
            console.log(parsedData);
            typeText(messageDiv, parsedData);
        } else {
            const err = await response.text();

            messageDiv.innerHTML = "Something went wrong"

            alert(err);
        }
    };

    return (
    <form>
       <div className="input_container">
           <Input />
           <button type="submit" onClick={handleClick}>
           <SendIcon />
           </button>
       </div>
    </form>
    )
};

export default Form;