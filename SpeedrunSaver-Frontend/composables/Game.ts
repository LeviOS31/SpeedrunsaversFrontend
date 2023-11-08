export const getGames = async () => {
    return await fetch(`http://localhost:5099/Games`)
        .then((res) => res.json())
        .then((data) => {
                return data;
            }
        );
}

export const getGame = async (id: number) => {
    return await fetch(`http://localhost:5099/Games/id/${id}`)
        .then((res) => res.json())
        .then((data) => {
                return data;
            }
        );
}

export const createGame = async (game) => {
    return await fetch(`http://localhost:5099/Games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
        .then((res) => {
            console.log(res.status)
            return res.status
        })
}