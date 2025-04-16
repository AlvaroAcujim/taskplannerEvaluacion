export const postTask = async(task) => {
    try{
        const data = JSON.stringify(task)
        const req = await fetch("https://script.google.com/macros/s/AKfycbxSwxGqnC1yOwp7fzE0x8fQaSXy4pIxQiaU0fWMdLlV7L1smQWg0bXchMGjCkO1O_48Rg/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        return req;
    }catch ( error ){
        return error;
    }
    
}