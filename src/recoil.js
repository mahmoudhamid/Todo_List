import { atom } from 'recoil'

export const usersState = atom({
    key: 'usersState',
    default: []
});
export const userState = atom({
    key: 'userState',
    default: { name: '', username: '', list: [], id: '', password: '' }
});
export const errorState = atom({
    key: 'errorState',
    default: ''
});
export const signupState = atom({
    key: 'signupState',
    default: false
});

export const wrapState = atom({
    key: 'wrapState',
    default: {
        list: false,
        login: true,
        signup: false
    }
})
export const userListState = atom({
    key: 'userListState',
    defualt: [{
        id: 0,
        name: ''
    }]
});
export const newItemState = atom({
    key: 'newItemState',
    defualt: ''
});
