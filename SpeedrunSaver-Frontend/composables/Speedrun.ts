export const getSpeedrunsByCategory = async (id) => {
    return await fetch(`http://localhost:5099/Speedrun/Category?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}