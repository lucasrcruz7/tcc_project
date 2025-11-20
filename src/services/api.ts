const baseUrl = 'http://localhost:3333'

export class Api {

    private async call(url: string, options?: RequestInit) {

        const token = localStorage.getItem('token') 

        const response = await fetch(`${baseUrl}/${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
           }
           
        })

        const responseJson = await response.json()

        if(!response.ok){
            throw new Error(responseJson.message);
        }

        return responseJson
    }

    get(url: string){
        return this.call(url)
    }

    post(url: string, body: object){
        return this.call(url, {
            method: 'post',
            body: JSON.stringify(body),
        })
    }

    put(url: string, body: object){
        return this.call(url, {
            method: 'put',
            body: JSON.stringify(body),
        })
    }

    delete(url: string){
        return this.call(url, {
            method: 'delete'
        })
    }


}