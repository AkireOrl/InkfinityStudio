import "./Pagination.css";

export const Pagination = ({ ClassPage, text, paginationChanger }) => {

    return (
        <div className='button' dragable="false">
            <div className={ClassPage} onClick={() => paginationChanger()} dragable="false" >
                {text}
            </div>
        </div>
    )
}