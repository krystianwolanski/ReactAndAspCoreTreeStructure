export const treeService = {
    getTree
}

function getTree() {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(`tree`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)

        if (!response.ok) {
            const error = (data && data.message) || response.statusText

            return Promise.reject(error)
        }

        return data;
    })
}