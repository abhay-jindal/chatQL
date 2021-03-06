import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
    mutation register($username: String! $email:String! $password: String! $confirmPassword: String!) {
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
            username createdAt
        }
    }
`;