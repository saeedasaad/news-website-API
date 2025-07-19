import React, { useEffect, useState } from 'react';
import Card from './Card';
import Menubar from './Menubar';
import SearchBar from './searchbar';
import ScrollTopButton from './ScrollTopButton';
import MobileMenuBar from './moblemenubar';

export default function Newsapp() {
    const [search, setSearch] = useState('pakistan');
    const [newsData, setNewsData] = useState([]);

    const API_key = "a5a031962299402299d659e0493f56a1";

    const getData = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_key}`);
            const jsonData = await response.json();
            console.log(jsonData.articles);
            setNewsData(jsonData.articles || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setNewsData([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSearchClick = () => {
        getData();
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white px-6 sm:px-[5%] md:px-[10%] py-4 flex flex-row justify-between items-center gap-6 md:gap-0">
                {/*  Menubar & Search */}
                <div className="gap-10 justify-start items-center xl:flex lg:flex xl:block lg:block hidden">
                    <Menubar />
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        handleSearchClick={handleSearchClick}
                    />
                </div>
                {/* Center: Logo */}
                <div className="text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                        Trending <span className="text-[#fd5168]">News</span>
                    </h1>
                </div>


                {/* Social Icons */}
                <div className="gap-8 justify-end items-center xl:flex lg:flex xl:block lg:block hidden">
                    <i className="fa-brands fa-facebook-f text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                    <i className="fa-brands fa-instagram text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                    <i className="fa-brands fa-twitter text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                    <i className="fa-brands fa-linkedin-in text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                </div>


                <MobileMenuBar />

            </nav>


            <hr className="w-full h-[1px] border-none bg-[#ddd]" />

            {/* Category Buttons */}
            <div className="CategoriesBtn flex flex-wrap gap-4 sm:gap-5 my-6 justify-center px-7">
                {[
                    'Sports', 'Politics', 'Entertainment', 'Health', 'Arts',
                    'Culture', 'Technology', 'Education', 'Business',
                ].map((category, index) => (
                    <button
                        key={index}
                        className="px-5 py-2 text-base sm:text-lg text-[#303134] font-semibold border border-[#ddd] rounded-md bg-white shadow-sm hover:text-[#fd5168] hover:border-[#fd5168] hover:shadow-md transition-all transform hover:-translate-y-1"
                        onClick={() => {
                            setSearch(category);
                            setTimeout(getData, 100);
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <hr className="w-full h-[1px] border-none bg-[#ddd]" />


            {/* News Cards Section */}

            <Card data={newsData} />

            <ScrollTopButton />

        </>
    );
}
