import { GetLists } from "../YataClient";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * AllListsView is the view which shows all the lists that a user has
 */
function AllListsView() {
  const [state, setState] = useState({
    error: null,
    loading: true,
    lists: null,
  });

  useEffect(() => {
    GetLists()
      .then((data) => {
        setState({ error: null, loading: false, lists: data.Lists });
      })
      .catch((error) => {
        setState({
          error: { code: error.name, message: error.message },
          loading: false,
          lists: null,
        });
      });
  }, []);

  let content;
  if (state.error !== null) {
    content = (
      <div>
        <b>Sorry, something went wrong</b>
        <br />
        <small>
          Error {state.error.code}: {state.error.message}
        </small>
      </div>
    );
  } else if (state.loading) {
    content = <div>Loading...</div>;
  } else {
    const allLists = state.lists.map((list) => (
      <div key={list.ListID} class="tile is-parent is-4">
        <article class="tile is-child has-background-primary box">
          <Link class="title" to={"/list/" + list.ListID}>
            {list.Title}
          </Link>
        </article>
      </div>
    ));
    content = <div class="tile is-ancestor is-flex-wrap-wrap">{allLists}</div>;
  }

  return <div>{content}</div>;
}

export default AllListsView;
