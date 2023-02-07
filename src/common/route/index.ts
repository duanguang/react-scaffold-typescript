import {  setMain } from "./main";



export const getRoutes = (mode: 'browser' | 'hash'='browser') => {
    return {
        main:setMain(mode)
    }
}