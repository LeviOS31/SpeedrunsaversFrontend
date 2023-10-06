export const getSpeedrunsByCategory = async (id) => {
    return await fetch(`http://localhost:5099/Speedrun/Category?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export const SubmitSpeedrun = async (speedrun) => {
    return await fetch(`http://localhost:5099/Speedrun/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: speedrun
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}