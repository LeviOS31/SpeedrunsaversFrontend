export const getPolls = async () => {
    return await fetch(`http://localhost:5254/Polls/Getall`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export const getPoll = async (id) => {
    return await fetch(`http://localhost:5254/Polls/Get?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export const CreatePoll = async (poll) => {
    return await fetch(`http://localhost:5254/Polls/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: poll
    })
    .then((res) => {
        console.log(res.status)
        return res.status
    })
}

export const sendvote = async (id, option) => {
    return await fetch(`http://localhost:5254/Polls/Addvote?id=${id}&option=${option}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        console.log(res.status)
        return res.status
    })
}