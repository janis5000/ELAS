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
            setProfile(profileRes)
        })
    }, [])

    return (
        <>
            {profile?.courses === null || profile?.courses.length === 0 ? "You have no courses selected yet." : profile?.courses.map(x => (
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
