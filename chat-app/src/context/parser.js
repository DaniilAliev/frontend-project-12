const parserUser = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
}

export default parserUser