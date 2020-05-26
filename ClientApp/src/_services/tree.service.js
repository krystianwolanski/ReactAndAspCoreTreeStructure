

export const treeService = {
    getTree,
    addNode,
    editNode
}

function getTree() {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(`tree`, requestOptions).then(handleResponse)
}
function addNode(Name, ParentNodeId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Name, ParentNodeId}),
    }

    return fetch('tree/node',requestOptions).then(handleResponse)
}

function editNode(NodeId, Name) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({NodeId, Name}),
    }

    return fetch('tree/node', requestOptions).then(handleResponse)
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