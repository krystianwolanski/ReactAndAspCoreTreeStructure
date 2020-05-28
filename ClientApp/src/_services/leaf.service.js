export const leafService = {
    addLeaf,
    editLeaf,
    deleteLeaf
}

function addLeaf(Name, ParentNodeId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Name, ParentNodeId}),
    }

    return fetch('leaf',requestOptions).then(handleResponse)
}

function editLeaf(LeafId, Name) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({LeafId, Name}),
    }

    return fetch('leaf', requestOptions).then(handleResponse)
}
function deleteLeaf(LeafId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({LeafId}),
    }

    return fetch('leaf', requestOptions).then(handleResponse)
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