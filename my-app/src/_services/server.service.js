export const serverService = {
    getList
};

function getList(token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': token }
    };

    return fetch(`http://playground.tesonet.lt/v1/servers`, requestOptions)
        .then(handleResponse)
        .then(servers => {
            return servers
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data;
    });
}