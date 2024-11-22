


export function getCars() {
    
    const x = JSON.parse(localStorage.getItem("carsCarrinho")) || [];
    return x
}