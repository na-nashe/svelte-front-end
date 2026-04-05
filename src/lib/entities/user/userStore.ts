import { writable } from 'svelte/store';


export const user = writable({
    id: '123',
    fullName: 'Олена Коваль',
    email: 'olena@example.com',
    avatarUrl: null, 
    isLoggedIn: true
});