import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DescribeList, GetItems } from "../YataClient";

/**
 * ListDetailsView is the view which shows the details for a list and all its items
 */
function ListDetailsView() {
  let { id } = useParams();

  const [listState, setListState] = useState({
    details: null,
    loading: true,
    error: null,
  });
  const [itemsState, setItemsState] = useState({
    items: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    GetItems(id)
      .then((data) => {
        setItemsState({
          items: data.Items,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error getting items ", error);
        setItemsState({
          items: null,
          loading: false,
          error: { code: error.name, message: error.message },
        });
      });

    DescribeList(id)
      .then((data) => {
        setListState({
          details: data.List,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error describing list ", error);
        setListState({
          details: null,
          loading: false,
          error: { code: error.name, message: error.message },
        });
      });
  }, [id]);

  //TODO: error
  if (listState.error !== null) {
    return renderError(listState.error);
  }

  if (itemsState.error !== null) {
    return renderError(itemsState.error);
  }

  let content;
  if (itemsState.loading || listState.loading) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <div>
        <ListDetails list={listState.details} loading={listState.loading} />
        <ListItems items={itemsState.items} loading={itemsState.loading} />
      </div>
    );
  }

  return <div class="content">{content}</div>;
}

function renderError(error) {
  return (
    <div>
      <h1 class="title">Sorry! Something went wrong</h1>
      <p>
        Error {error.code}: {error.message}
      </p>
    </div>
  );
}

function ListDetails(props) {
  return <h1 class="title">{props.list.Title}</h1>;
}

function ListItems(props) {
  let content;
  if (props.items.length === 0) {
    content = <div>There are no items!</div>;
  } else {
    content = props.items.map((item) => (
      <li key={item.ItemID}>{item.Content}</li>
    ));
  }

  return <ul>{content}</ul>;
}

export default ListDetailsView;
