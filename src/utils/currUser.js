export const getCurrentUser = async (id) => {
    try {
        const check = window.sessionStorage.getItem("currUser");
        if (check) {
            return JSON.parse(check);
        }
        else{
            const currUser = await fetch('/api/getOneUser/'+id)
            .then(res => res.json())
            .then(res => {
                return res
            })
            return currUser;
        }
    }
    catch (err) {
        console.log(err, "Error in getCurrentUser.js")
    }
}