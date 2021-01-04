import React from "react";
import {
    useParams
} from "react-router-dom";

/**
 * ListDetailsView is the view which shows the details for a list and all its items
 */
function ListDetailsView() {
    let { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
            This will be the page that displays all the items and details for a list
        </div>
    )
}

export default ListDetailsView;
