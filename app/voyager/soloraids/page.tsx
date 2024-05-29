"use client"
import Footer from '@/app/components/reusable/Footer'
import Navbar from '@/app/components/reusable/HomeNavbar'
import Dropdown from '@/app/utils/dropdown'
import React from 'react'

const SoloRaids = () => {
    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen">
                <aside className="bg-[#75E2FF] w-80 p-12">
                    <div className="mb-6 bg-white p-4 rounded-2xl">
                        <img src="/calendar.jpg" className='rounded-full w-[20%]' />
                        <h2 className="text-lg mb-2 mt-2">Events I am Organizing</h2>
                        <a href="/voyager/solomint"><button className="w-[80%] bg-black text-white py-2 rounded mt-6">+ Create an Event</button></a>
                    </div>
                    <div className="mb-6 bg-white p-4 rounded-2xl">
                        <img src="/calendar.jpg" className='rounded-full w-[20%]' />
                        <a href="/voyager/profile"><h2 className="text-lg mb-2 mt-8"><span className="text-4xl float-right">↗</span>Solo raid I am Attending </h2></a>
                    </div>
                    <div className="mb-6 bg-white p-2 rounded-2xl">
                        <h2 className="text-lg mb-2"><Dropdown/></h2>
                    </div>
                </aside>
                <main className="bg-[#D7E58D] flex-grow p-8">
                    <div className="flex items-center mb-8">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-[50%] px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-4">
                            <img src="/solo1.png" className="w-80 h-90 object-cover rounded-lg mb-4" />
                            <h3 className="text-3xl mb-2">Trip to Bali</h3>
                            <p className="text-gray-700 mb-4">No of seats allowed:</p>
                            <button className="w-[50%] bg-black text-white py-2 rounded">Join now</button>
                        </div>
                        <div className="bg-white p-4">
                            <img src="/solo2.png" className="w-80 h-90 object-cover rounded-lg mb-4" />
                            <h3 className="text-3xl  mb-2">Trip to Bali</h3>
                            <p className="text-gray-700 mb-4">No of seats allowed:</p>
                            <button className="w-[50%] bg-black text-white py-2 rounded">Join now</button>
                        </div>
                        <div className="bg-white p-4">
                            <img src="/solo3.png" className="w-80 h-90 object-cover rounded-lg mb-4" />
                            <h3 className="text-3xl mb-2">Trip to Bali</h3>
                            <p className="text-gray-700 mb-4">No of seats allowed:</p>
                            <button className="w-[50%] bg-black text-white py-2 rounded">Join now</button>
                        </div>

                    </div>
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default SoloRaids