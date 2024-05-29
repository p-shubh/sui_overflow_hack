"use client"
import Footer from '@/app/components/reusable/Footer'
import Navbar from '@/app/components/reusable/HomeNavbar'
import React, { useState } from 'react'

const SoloMint = () => {
    const [comments, setComments] = useState<string[]>([]);
    const [comment, setComment] = useState<string>('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        }
    };
    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen">
                <aside className="bg-[#75E2FF] w-80 p-12">
                    <div className="">
                        <button className="w-[80%] bg-black text-white py-2 rounded mt-6">Mint Now</button>
                    </div>
                    <div className="mt-16 space-y-2 h-[50%] bg-white">
                        {comments.map((cmt, index) => (
                            <div key={index} className="p-2 border-b">
                                {cmt}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                        <textarea
                            className="w-full p-2 border rounded mt-4"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                   
                </aside>
                <main className="bg-[#D7E58D] flex-grow p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-4">
                            <img src="/solo1.png" className="w-80 h-90 object-cover rounded-lg mb-4" />
                            <h3 className="text-3xl mb-2">Trip to Bali</h3>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default SoloMint