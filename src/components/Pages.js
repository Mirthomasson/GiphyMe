import React from "react";


const Pages = props => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <nav>
        <ul classname="pagination pagination-sm justify-content-end border-0">
            {pageNumbers.map(number => {
                let classes = "page-item";
                if(number === props.currentPage) {
                    classes += "active";
                }
                return (
                    <li classname={classes}>
                        <a 
                        onClick={() => props.pageSelected(number)} 
                        href="!" 
                        className="page-link">
                            {number}
                            </a>
                    </li> 
                );
            })}
        </ul>
    </nav>
    );
};



export default Pages;