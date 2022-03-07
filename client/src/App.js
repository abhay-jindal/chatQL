import "./App.scss"
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import { Container } from 'react-bootstrap'
import ApolloProvider from "./ApolloProvider";
import { Toaster } from 'react-hot-toast';
import { Switch } from 'react-router-dom'
import { AuthProvider } from "./context/auth";
import { MessageProvider } from './context/message'
import DynamicRoute from "./utils/DynamicRoute";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <Container className='pt-md-2 pb-3'>
            <Toaster position="top-center" />
              <Switch>
                  <DynamicRoute exact path="/" component={Home} guest />
                  <DynamicRoute path="/account" component={Account} authenticated />
                  <DynamicRoute path="/dashboard" component={Dashboard} authenticated />
                </Switch>
          </Container>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
