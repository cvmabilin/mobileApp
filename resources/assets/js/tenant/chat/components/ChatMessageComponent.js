import React, { Fragment } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

class ChatMessageComponent extends React.Component {

    constructor(props) {
        super(props)

        let { message, date_time, name, img } = props.navigation.getParam('data')

        this.state = {
            messages: [
                {
                    _id: 1,
                    text: message,
                    createdAt: new Date(date_time),
                    user: {
                        _id: 2,
                        name: name,
                        avatar: img,
                    },
                },
            ]
        };    
    }

    onSend = (messages = []) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        const { messages } = this.state

        return (
            <Fragment>

                <GiftedChat
                    messages={messages}
                    onSend={messages => this.onSend(messages)}
                    user={
                        {
                            _id: 1
                        }
                    }
                />
            </Fragment>
            
        );
    }

}

export default ChatMessageComponent