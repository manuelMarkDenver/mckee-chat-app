import { ChatEngine } from 'react-chat-engine';

import './App.css'
import LoginForm from './components/LoginForm';
import ChatFeed from './components/ChatFeed';



const App = () => {
  if(!localStorage.getItem('username')) return <LoginForm />
  return (
    <ChatEngine
      height="100vh"
      projectID="4c5c8b73-6610-4d3f-9e4a-9bd24492ab39"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
  )
}

export default App