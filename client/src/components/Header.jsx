import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";

function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"]
    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    function toggleTheme() {
        if (theme === "light-theme") {
            setTheme("dark-theme")
        }
        else {
            setTheme("light-theme")
        }
    }
    return (
        <header>

            <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
                <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 md-5 mt-5">News_Aggregator</h3>
                <span className="logo">
                    <img src="" alt="News_Aggregator" />

                </span>
                <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/16 md:basis-4/6 md:justify-end ${active ? 'active' : ''}`}>
                    <li>
                        <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
                            All News
                        </Link>
                    </li>
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>
                            Top Headline
                        </Link>
                    </li>

                    <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
                        {Countries.map((element, index) => (
                            <li key={index} onClick={() => setShowCategoryDropdown(!showCountryDropdown)}>
                                <Link to={`/country/${element?.iso_2_alpha}`} className="flex gap-3" onClick={() => { setActive(!active) }}>
                                    <img src="{element?.png}" srcSet={`https://flagcdn.com/${element?.iso_2_alpha}.png 2x}`} alt="{element?.counrtyName}" />
                                    <span>{element?.countryName}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <li>
                        <Link className="no-underline font-semibold" to="#" onClick={() => { toggleTheme }}>
                            <input type="checkbox" class="checkbox" id="checkbox" />
                            <label for="checkbox" class="checkbox-label">
                                <i class="fas fa-moon"></i>
                                <i class="fas fa-sun"></i>
                                <span class="ball"></span>
                            </label>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;