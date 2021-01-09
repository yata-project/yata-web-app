import CreateListForm from "./CreateListForm";
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
      <div key={list.ListID} className="tile is-parent is-4">
        <article className="tile is-child has-background-primary box">
          <Link className="title" to={"/list/" + list.ListID}>
            {list.Title}
          </Link>
        </article>
      </div>
    ));

    const newListHandler = onNewList(state, setState);

    content = (
      <div>
        <section className="section">
          <div className="container">
            <CreateListForm onSuccess={newListHandler} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="tile is-ancestor is-flex-wrap-wrap">{allLists}</div>
          </div>
        </section>
      </div>
    );
  }

  return <div>{content}</div>;
}

function onNewList(state, setState) {
  return (id, title) => {
    setState((state) => {
      return {
        ...state,
        lists: [{ ListID: id, Title: title }, ...state.lists],
      };
    });
  };
}

export default AllListsView;
