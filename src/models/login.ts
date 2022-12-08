export type Tlogin = {
    
        "mid": string,
        "sid": string,
        "sig": string,
        "secret": string,
        "expire": number,
        "user": Tuser
}
type Tuser = {
        "id": string,
        "domain": string,
        "href": string,
        "first_name": string,
        "last_name": string,
        "nickname": string
}