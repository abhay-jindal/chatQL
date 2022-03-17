import "./App.scss"
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import ApolloProvider from "./ApolloProvider";
import { Toaster } from 'react-hot-toast';
import { Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from "./context/auth";
import { MessageProvider } from './context/message'
import DynamicRoute from "./utils/DynamicRoute";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
            <Toaster position="top-center" />
              <Switch>
                  <DynamicRoute exact path="/" component={Home} guest />
                  <DynamicRoute exact path="/account/:action" component={Account} guest />
                  {/* <DynamicRoute path="/account" component={Account} authenticated /> */}
                  <DynamicRoute path="/dashboard" component={Dashboard} authenticated />
                  <DynamicRoute path="*" guest>
                    <Redirect to="/account/login" />
                  </DynamicRoute>
                </Switch>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
