import React from 'react'

function CustomCard({ title, number, color }) {
    return (
        <div className='mt-[10px]'>
            <div className={`${color} max-sm:px-4 w-[200px] max-sm:w-[162px] min-[375px]:w-[170px] max-lg:w-[180px] min-[414px]:w-[190px]  min-[390px]:w-[179px] min-[430px]:w-[199px]  max-md:w-[130px] max h-fit py-2 rounded-lg relative `}>
                <div className='bg-white absolute w-full h-[50px] top-0 left-0 opacity-10 rounded-md shadow-xl'></div>
                <p className='text-white pt-2 font-semibold z-10 max-sm:text-[14px] '>{title}</p>
                <p className='text-white text-3xl pt-3 pb-1 max-sm:text-[22px]'>{number}</p>

            </div>
        </div>
    )
}

export default CustomCard