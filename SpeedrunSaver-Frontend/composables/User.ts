export const login = async (user) => {
    return await fetch(`http://localhost:5099/User/Validation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user
    })
        .then((res) => {
            console.log(res.status)
            return res.status
        })
    }