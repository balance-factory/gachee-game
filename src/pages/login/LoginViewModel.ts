import * as API from "../../data/api";

export type UserType = {
    gender: string;
    name: string;
};

export const getUsers = (): UserType[] => {
    let aa: UserType[] = [];
    fetch(API.UsersDatabaseURL)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log("res", res);
            return (aa = res);
        });

    return aa;
};

export const addUser = (user: { gender: string; name: string }) => {
    fetch(API.UsersDatabaseURL, {
        method: "POST",
        body: JSON.stringify(user),
    }).then((res) => {
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
};
