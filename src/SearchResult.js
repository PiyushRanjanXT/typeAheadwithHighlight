import React from 'react'

const setHtml = (text) =>(
    {
        __html:text
    }
)
const SearchResult = ({ list, searchText }) => (
    list?.length > 0
        ? (
            <ul>
                {list.map((item, index) =>
                (
                    <li
                        key={index} 
                        dangerouslySetInnerHTML={setHtml(item.replace(searchText, `<span class="highlight">${searchText}</span>`))}
                        > 
                        </li>
        )
                )}
            </ul >
        )
        : null
);

export default SearchResult;


