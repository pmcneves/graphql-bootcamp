import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  // create user state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);

  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  if (movieError) console.log(movieError);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
          value={nationality}
        />
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age: Number(age), nationality } },
            });
            refetch()

          }
          }
        >
          Create User
        </button>
      </div>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.name}>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1 key={movie.name}>{movie.name}</h1>;
        })}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
          value={movieSearched}
        />
        <button
          onClick={() => fetchMovie({ variables: { name: movieSearched } })}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>year: {movieSearchedData.movie.yearOfPublication}</h1>
            </div>
          )}
          {movieError && <h1>Error fetching movie</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
