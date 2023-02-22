import * as API from "../../data/api";

export type UserType = {
    gender: string;
    name: string;
    email: string;
    userId: string;
};

export const getUsers = (): UserType[] => {
    let aa: UserType[] = [];
    fetch("http://35.73.236.228:8080/users")
        .then((res) => {
            return res.json();
        })
        .then((res) => console.log("res", res));

    return aa;
};

export const addUser = (user: UserType) => {
    fetch("http://35.73.236.228:8080/users", {
        method: "POST",
        body: JSON.stringify(user),
    }).then((res) => {
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
};
