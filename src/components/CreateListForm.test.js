import * as YataClient from "../YataCLient";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import CreateListForm from "./CreateListForm";

beforeEach(() => {
  YataClient.CreateList = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Create New List Successful", async () => {
  const newListID = "05937447-82dd-4463-b4b9-45b0bcb7a1af";
  const newListTitle = "FooBarBaz List";
  YataClient.CreateList.mockImplementation((title) => {
    return Promise.resolve({ ListID: newListID });
  });

  const onNewList = jest.fn();
  render(<CreateListForm onSuccess={onNewList} />);

  const createListInput = screen.getByLabelText("Create List");
  expect(createListInput).toBeInTheDocument();

  const createListHint = screen.getByText(
    "Type in a list title between 0 and 100 characters"
  );
  expect(createListHint).toBeInTheDocument();

  fireEvent.change(createListInput, {
    target: { value: newListTitle },
  });

  expect(createListInput.value).toBe(newListTitle);
  expect(createListHint.textContent).toBe("Press enter to create the new list");

  fireEvent.submit(screen.getByTestId("createListForm"));

  await waitFor(() =>
    expect(onNewList).toHaveBeenCalledWith(newListID, newListTitle)
  );
});

test("Create New List Input Too Long", async () => {
  const onNewList = jest.fn();
  render(<CreateListForm onSuccess={onNewList} />);

  let newListTitle;
  for (let i = 0; i < 101; i++) {
    newListTitle += "a";
  }
  const createListInput = screen.getByLabelText("Create List");
  fireEvent.change(createListInput, {
    target: { value: newListTitle },
  });

  expect(createListInput.value).toBe(newListTitle);
  const createListHint = screen.getByText(
    "Title must be less than 100 characters"
  );
  expect(createListHint).toBeInTheDocument();

  fireEvent.submit(screen.getByTestId("createListForm"));

  expect(onNewList).not.toHaveBeenCalled();
});

test("Yata API Throws Error", async () => {
  const newListTitle = "FooBarBaz List";
  YataClient.CreateList.mockImplementation((title) => {
    return Promise.reject(
      new YataClient.HttpResponseError("GenericYataError", "Something blew up")
    );
  });

  const onNewList = jest.fn();
  render(<CreateListForm onSuccess={onNewList} />);

  const createListInput = screen.getByLabelText("Create List");
  expect(createListInput).toBeInTheDocument();

  const createListHint = screen.getByText(
    "Type in a list title between 0 and 100 characters"
  );
  expect(createListHint).toBeInTheDocument();

  fireEvent.change(createListInput, {
    target: { value: newListTitle },
  });

  expect(createListInput.value).toBe(newListTitle);
  expect(createListHint.textContent).toBe("Press enter to create the new list");

  fireEvent.submit(screen.getByTestId("createListForm"));

  await waitFor(() => {
    expect(YataClient.CreateList).toHaveBeenCalled();
  });
  const errorMsg = screen.getByText(
    "Error GenericYataError: Something blew up"
  );
  expect(errorMsg).toBeInTheDocument();
});
