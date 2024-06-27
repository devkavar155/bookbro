export const getAllUsers = async () => {
    try {
        const allUsers = window.sessionStorage.getItem("allUsers");
        if (allUsers) {
            return JSON.parse(allUsers);
        }
        else{
            const allUsers = await fetch('/api/getAllUsers')
            .then(res => res.json())
            .then(res => {
                return res
            })
            window.sessionStorage.setItem("allUsers", JSON.stringify(allUsers));
            return allUsers;
        }
    }
    catch (err) {
        console.log(err, "Error in getAllUsers.js")
    }
}