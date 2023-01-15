import React from 'react';
import List from "@material-ui/core/List";
import {ListItem, ListItemText} from "@material-ui/core";

const CourseResults = (Lectures) => {
    return (
        <>

            <List component="nav" aria-label="secondary mailbox folders">
                {Lectures['Lectures'].map(x =>
                <ListItem button>
                    <ListItemText primary={x.name} />
                </ListItem>
                )}
            </List>
        </>
    )
}

export default CourseResults;