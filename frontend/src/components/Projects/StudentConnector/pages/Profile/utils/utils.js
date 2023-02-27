export const checkIfOwner = (owner_id, profile_url_id, setIsOwner) => {
    if (owner_id === parseInt(profile_url_id)) {
        setIsOwner(true);
    } else {
        setIsOwner(false);
    }
}