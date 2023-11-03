export const getPlatforms = async () => {
    return await fetch(`http://localhost:5099/Platform/All`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}