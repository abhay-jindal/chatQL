import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
query login($username: String!, $password: String!, $remember: String) {
  login(username: $username, password: $password, remember: $remember) {
    id
    username
    imageURL
    token
  }
}
`