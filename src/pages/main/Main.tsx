import styled from "styled-components";
import { useState, useEffect } from "react";


const Main = () => {
    const [users,setUsers] = useState<{gender : string, name : string}[]>([])
    const databaseURL = "https://gachee-game-default-rtdb.firebaseio.com/users"

    const getData = () => {
        fetch(`${databaseURL}.json`).then((res)=> {
          return res.json();
        }).then((users)=> {
            setUsers(users);
            return console.log("users", users)
        })
    }

    useEffect(()=> {
        getData();
    },[])

    console.log(users);
    return (
        <>
            <Header>메인페이지</Header>
        </>
    );
};
export default Main;

const Header = styled.h1`
    color: blue;
`;
