export const browseAllBooks = async () => {
    try {
        const allBooks = window.sessionStorage.getItem("allBooks");
        if (allBooks) {
            console.log("if")
            return JSON.parse(allBooks);
        }
        else{

            console.log("catch")
            const allBooks = await fetch('/api/browseAllBooks')
            .then(res => res.json())
            .then(res => {
                return res
            })

            console.log("allBooks", allBooks)
            
            // window.sessionStorage.setItem("allBooks", JSON.stringify(allBooks));
            
            return allBooks;
        }
    }
    catch (err) {
        console.log(err, "Error in browseAllBooks.js")
    }
}

