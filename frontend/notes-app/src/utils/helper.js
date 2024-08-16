export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if (!name) {
        return null;
    }

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i < Math.min(2, words.length); i++){
        initials += words[i][0];
    }

    return initials;
} 