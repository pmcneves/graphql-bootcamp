import "./App.css";
import {
  InMemoryCache,
  ApolloProvider,
  ApolloClient
} from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of Users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
