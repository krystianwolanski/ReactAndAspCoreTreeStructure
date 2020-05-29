export const nodeService = {
    addNode,
    editNode,
    deleteNode,
    moveNode
}

function addNode(Name, ParentNodeId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Name, ParentNodeId}),
    }

    return fetch('node',requestOptions).then(handleResponse)
}

function editNode(NodeId, Name) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({NodeId, Name}),
    }

    return fetch('node', requestOptions).then(handleResponse)
}
function deleteNode(NodeId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({NodeId}),
    }

    return fetch('node', requestOptions).then(handleResponse)
}
function moveNode(ElementId, ToNodeId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ElementId, ToNodeId})
    }

    return fetch('node/move', requestOptions).then(handleResponse)
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