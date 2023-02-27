import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Grid} from "@material-ui/core";
import SearchSite from "../../pages/SearchSite/SearchSite";
import {ProfileContextProvider} from "../../utils/auth/ProfileContext"
import {AuthConfigContextProvider} from "../../utils/auth/AuthConfig"
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import LectureSite from "../../pages/LectureSite/LectureSite";
import Profile from "../../pages/Profile/Profile";
import Messages from "../../pages/Chat/Messages";
import {MessageContextProvider} from "../../utils/messages/MessageContext";

export const StudentConnectorRouter = () => {
    return (
        <Router>
            <Grid>
                <AuthConfigContextProvider>
                    <ProfileContextProvider>
                        <MessageContextProvider>
                        <div className="sidebar">
                            <div style={{marginLeft: 300}}>
                                <Sidebar/>
                                <Route
                                    exact
                                    path="/studentconnector"
                                    component={Dashboard}
                                />
                                <Route
                                    exact
                                    path="/studentconnector/search-course"
                                    component={SearchSite}
                                />
                                <Route
                                    exact
                                    path="/studentconnector/lecture/:id"
                                    component={LectureSite}
                                />
                                <Route
                                    exact
                                    path="/studentconnector/profile/:id"
                                    component={Profile}/>
                                <Route
                                    exact
                                    path="/studentconnector/chats"
                                    component={Messages}/>
                            </div>
                        </div>
                        </MessageContextProvider>
                    </ProfileContextProvider>
                </AuthConfigContextProvider>
            </Grid>
        </Router>
    )
}
