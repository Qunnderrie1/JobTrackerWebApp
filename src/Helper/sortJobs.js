


export const sortJobs = (name = []) => {

    return name.sort((a, b) => {
        if (a.name > b.name) {
            return -1
        }
        return 0
    })

}