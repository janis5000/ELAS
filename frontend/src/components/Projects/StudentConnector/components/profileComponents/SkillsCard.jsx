import React, {useEffect, useState} from 'react'

const SkillsCard = ({currentProfile}) => {

    return
    (
        <div>Skills: {currentProfile?.skills.map(x => (
            <Chip
                clickable
                color="primary"
                onClick={() => handleDelete(x)}

                deleteIcon={<DoneIcon/>}
                color="primary"
                label={x} key={x.id}>

            </Chip>
        ))}
        </div>
        )
}

export default SkillsCard;