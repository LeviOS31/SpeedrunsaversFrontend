export const login = async (user) => {
    return await fetch(`http://localhost:5099/User/Validation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Get the response as a single string
        } else {
           return response.text(); // return a rejected promise if the status is not 200
        }
    }).then(data => {
        return data;
    })
}

export const verify = async (token, userid) => {
    return await fetch(`http://localhost:5099/User/Checks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
            userid: userid,
            accesforadmin: false, 
        })
    })
    .then(response=>{

        if(response.ok) {
            return true;
        }
        else { 
            return false;
        }
    })
}