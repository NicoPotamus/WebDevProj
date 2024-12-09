import { ref } from "vue";
import { type User } from "./user";


const loggedInUser = ref<User | null>(null);

export function refUser() {
  return loggedInUser;
}

export function signIn(user: User | null, token: string) {
  loggedInUser.value = user;
  if (user && token) {
    localStorage.setItem("jwtToken", token); // Store the JWT token in localStorage
    localStorage.setItem("user", JSON.stringify(user)); // Store the user information in localStorage
  }
}

export function signOut() {
  loggedInUser.value = null;
  localStorage.removeItem("jwtToken"); // Remove the JWT token from localStorage
  localStorage.removeItem("user"); // Remove the user information from localStorage
}

export function getToken() {
  return localStorage.getItem("jwtToken"); // Retrieve the JWT token from localStorage
}

export function initializeUser() {
    if (!loggedInUser.value) {
        try{
            const user = localStorage.getItem("user");
            if (user) {
                loggedInUser.value = JSON.parse(user); // Retrieve the user information from localStorage
            }
        }catch(error){
      console.error('User not logged in:', error)
    }
  }
}