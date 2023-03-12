import React from "react";
import user from "../assets/user.avif"
import chatBot from "../assets/chatBot.avif"


function Chat() {

    return (
        <div id="chat_container"></div>
    )
}

export function chatStripe(isAi, value, uniqueId) {
    return (
        // Dynamic HTML template
        `
                <div id="messageContainer">
                    <div id=${isAi ? "ai" : "chatStripe"}>
                        <div class="profile">
                            <img 
                            src=${ isAi ? chatBot : user } 
                            alt=${ isAi ? "chatBot" : "user" } >
                            </img>
                        </div>
                        <div class="chat" id=${uniqueId}>
                            ${value}
                        </div>
                    </div
                </div>
        `
    )
}

export default Chat;