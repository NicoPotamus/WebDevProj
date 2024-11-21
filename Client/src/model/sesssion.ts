import { ref } from "vue";
import { type User } from "./user";

const loggedInUser = ref<User | null>(null)

export function refUser(){
    return loggedInUser
}

export function signIn(user: User | null){
    loggedInUser.value = user
}