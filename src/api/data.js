import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// Implement application-specific requests

// export async function getMeme()

export async function getCars(){
    return await api.get(host+'/data/cars?sortBy=_createdOn%20desc'); 
}

export async function getCarById(id){
    return await api.get(host+'/data/cars/'+id);
}
export async function getMyCars(){
    const userId=sessionStorage.getItem('userId');
    return await api.get(host+`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function createCar(cars){
    return await api.post(host+'/data/cars',cars);
}

export async function editCar(id,car){
    return await api.put(host+'/data/cars/'+id ,car);
}
export async function deleteCar(id){
    return await api.del(host+'/data/cars/'+id);
}
export async function search(query){
    return await api.get(host+`/data/cars?where=year%3D${query}`)
}