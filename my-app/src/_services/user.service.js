export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://playground.tesonet.lt/v1/tokens`, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('TOKEN', JSON.stringify(token))

            return token
        })
}

function logout() {
    localStorage.removeItem('TOKEN');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data;
    });
}