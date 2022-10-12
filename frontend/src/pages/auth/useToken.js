export function getToken() {
    const token = localStorage.getItem('token');
    if (token)
        return token;
    return undefined;
}

export async function validToken(token) {
    if (!token)
        return false;
    const tokenString = await fetch('http://localhost:3001/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"token": token})
    });
    const tokenJSON = await tokenString.json();
    // console.log("Here: " + tokenJSON["valid"]);
    return tokenJSON["valid"].toString() === "true";
}

export function saveToken(token) {
    if (token && token !== "invalid") {
        localStorage.setItem('token', token);
    }
}