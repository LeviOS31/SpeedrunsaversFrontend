export const getGames = async () => {
    return await fetch(`http://localhost:5099/Game/All`)
        .then((res) => res.json())
        .then((data) => {
                return data;
            }
        );
}

export const getGame = async (id: number) => {
    return await fetch(`http://localhost:5099/Game/Specific?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
                return data;
            }
        );
}