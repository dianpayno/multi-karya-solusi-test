import React from 'react'

const ProfileHomepageComponents = () => {
  return (
    <div 
    style={{
        backgroundImage: `url(https://mksolusi.id/wp-content/uploads/2019/07/working-freelancer-germany.jpeg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }}
    className='h-[400px] max-w-full flex flex-col justify-center items-center text-center py-7'>
        <p className='text-xl text-white font-semibold '>Profile</p>
        <div className='w-[120px] rounded-full mt-2 h-[5px] bg-white mb-10'>

        </div>
        <div className='w-[800px] text-white text-[14px]'>
        <span>PT Multi Karya Solusi is an Information Technology solutions company that includes Information Technology Consultation and Planning, Application System Development, Integration of communication devices and networks as well as maintenance and repair of system devices with coverage in various fields in the public and private sectors.</span>
        </div>
        <button className="px-4 py-1 bg-[#17375E] text-[14px] mt-10 rounded-lg text-white">
            <span>Read More</span>
        </button>
        
      
    </div>
  )
}

export default ProfileHomepageComponents
