


export const changeStatusColor = (status) => {

    switch (status) {
        case "Applied":
            return <p className="text-blue-900 bg-blue-200  rounded-full w-fit px-3 font-normal m-auto">Applied</p>
        case "Interviewed":
            return <p className="text-orange-900 bg-orange-200  rounded-full w-fit px-3 font-normal m-auto">Interviewed</p>
        case "Offer":
            return <p className="text-green-900 bg-green-200  rounded-full w-fit px-3 font-normal m-auto">Offer</p>
        case "Rejected":
            return <p className="text-red-900 bg-red-200  rounded-full w-fit px-3 font-normal m-auto">Rejected</p>
    }

}