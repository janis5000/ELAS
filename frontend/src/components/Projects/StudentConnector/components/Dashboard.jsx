import React, {useEffect, useState} from 'react'
import Backend from "../../../../assets/functions/Backend";
import {createAuthConfig} from "../utils/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Dashboard = () => {
    const [profile, setProfile] = useState(null)

    const authConfig = createAuthConfig()

    useEffect(() => {
        Backend.get("/studentconnector/profile", authConfig).then((response) => {
            let profileRes = response.data
            debugger;
            setProfile(profileRes)
        })
    }, [])

    return (
        <>
            {profile?.courses.map(x => (
                <Card>
                    <CardContent>
                        {x.name}
                    </CardContent>
                </Card>))}
            {}
        </>
    )
}
export default Dashboard;
