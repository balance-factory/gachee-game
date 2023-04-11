export const BASE_URL: any = "http://35.73.236.228:8080";

export type UserType = {
    gender: string;
    name: string;
    email: string;
    userId: string;
};

export const getUsers = (): UserType[] => {
    let aa: UserType[] = [];
    fetch(`${BASE_URL}/users`)
        .then((res) => {
            return res.json();
        })
        .then((res) => console.log("res", res));

    return aa;
};

export const addUser = (user: UserType) => {
    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: user.userId,
            email: user.email,
            gender: user.gender,
            name: user.name,
        }),
    }).then((res) => {
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
};
