export async function getClientStatus(){
    return fetch('api/clientStatus').then(res => res.json())
}