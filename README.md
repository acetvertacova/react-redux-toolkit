# Lab №6:

## Installation and Project Launch Instructions

### Setting up the working environment

1. Download and install the latest or stable version of **Node.js**.

2. Check the installation of **Node.js** and **NPM** by running the following commands in the terminal:

    `node -v`
    
    `npm -v`

3. Navigate to the project folder and start the development server with `npm run dev`.

### 🖋️ Redux Toolkit

Redux Toolkit is a powerful and efficient library that simplifies managing the state in React applications using Redux. It provides a set of tools and best practices to streamline the development of complex state logic while maintaining scalability and readability.

To install the Redux Toolkit library, run the following command in the terminal:

    `npm install @reduxjs/toolkit react-redux`

## Lab's Description

The goal is to implement an online store with functionality to display products, add them to a cart, change quantities, and remove items. The app uses global state management via Redux Toolkit. Product data is fetched asynchronously from a mock API using `createAsyncThunk`.

## Project Structure

        src/
        │── assets/
        │── layouts/
        │   └── MainLayout.jsx       # Main layout component (includes Header, Footer, etc.)
        |
        │── components/
        │   │── Footer.jsx
        │   │── Header.jsx
        │   │── MenuCard.jsx         # Product/menu item card with "Add to cart" button
        │   └── NewMenuItemForm.jsx  # Form for adding a new menu item with validation
        |
        │── store/                   # Redux Toolkit store and feature slices
        │   │── cart/                # Cart-related state and logic
        |   |   │── actions.js       # Selectors for cart
        │   |   └── slice.js         # Cart slice: initial state, reducers, actions
        │   │── menu/                # Menu-related state and logic
        |   |   │── actions.js       # Async thunks (fetch, create) and selectors
        │   |   └── slice.js         # Menu slice: reducers and async logic
        │   └── store.js             # Store configuration, combining all slices
        |
        │── pages/                   # Route-based pages
        │   │── AboutPage.jsx
        |   │── CartPage.jsx
        |   └── NotFoundPage.jsx
        |
        │── validation/
        |   └── menu.schema.js       # Validation schema for the new menu item form (e.g., using Yup)
        |
        │── App.jsx
        │── main.jsx
        │── App.css
        |── ...
    
## Usage Examples

1. Store Configuration

This file sets up the Redux store using Redux Toolkit's configureStore. It combines multiple reducers into a single root reducer, providing global access to the store for the entire application.

By configuring the store with these two slices (`cart` and `menu`), the application has a centralized place to manage and access all the necessary state, making it scalable and easy to maintain.

```js
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            menu: menuReducer,
        },
    });
```

The store is wrapped with the `<Provider>` component from `react-redux` in the main entry file (`main.jsx`), allowing the entire application to access the global state.

```jsx
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
```

2. Implementing a Cart with Redux Toolkit

This slice manages the shopping cart state using Redux Toolkit. It provides actions for adding, removing, and updating products in the cart. It also integrates with `localStorage` to persist the cart's state across page reloads.

<img src='/src/assets/cart(0).png'>

<img src='/src/assets/addingToCart.png'>

**`localStorage`** in JavaScript allows web applications to store data locally within the user's browser – with no expiration date. The data isn't deleted when the browser is closed, and is available when the browser is opened again.

<img src='/src/assets/cart.png'>

Reducers:

- `addToCart`
    - Adds a new item to the cart or increases the quantity of an existing item if the same item (based on `id` and `size`) is already in the cart.
    - Calculates and updates the `totalPrice` for that item based on its price and quantity.
    - Syncs the updated cart to `localStorage`.

```js
addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            );
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    size: newItem.size,
                    totalPrice: action.payload.totalPrice,
                    quantity: 1,
                });
            }

            setItem(state.items.map(item => item));
}
```

<img src='/src/assets/addingToCart.png'>

- `removeFromCart`
    - Remove all instances of the item that match the given `id` and `size`.
    - Syncs the updated cart to `localStorage`.

```js
removeFromCart(state, action) {
            const findItemToDelete = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );

            state.items = state.items.filter(
                (item) => item.id != action.payload.id || item.size != action.payload.size
            );

            setItem(state.items.map(item => item));
        }
```

<img src='/src/assets/deleteItemFromCart.png'>

- `updateQuantity`
    - Allows direct modification of an item's quantity and recalculates its `totalPrice` based on the new quantity.
    - Syncs the updated cart to `localStorage`.
    - `handleIncreaseItem(item)`
        - Accepts an `item` object from the cart.
        - Dispatches the `updateQuantity` action with the incremented quantity.

        ```jsx
        const handleIncreaseItem = (item) => {
        const quant = dispatch(updateQuantity({
            id: item.id,                
            size: item.size,
            quantity: item.quantity + 1,
            }));
        }
        ```

<img src='/src/assets/increaseItemInCart.png'>

-`handleDecreaseItem(item)`
        - Decreases the quantity of a specific item in the cart by 1. If the quantity becomes 1, the item is removed from the cart.

    ```jsx
        const handleDecreaseItem = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                id: item.id,
                size: item.size,
                quantity: item.quantity - 1,
            }));
        } else {
            handleDelete(item);
        }
        }
    ```

<img src='/src/assets/descreaseItemInCart.png'>

```js
updateQuantity(state, action) {
            const findItem = state.items.find((item) => item.id === action.payload.id && item.size === action.payload.size);

            if (findItem) {
                findItem.quantity = action.payload.quantity;
                findItem.totalPrice = findItem.price * findItem.quantity;
            }
            setItem(state.items.map(item => item));
        }
```

3. Displaying Quantity of Menu Items in the Header

- Header Component
    - Displays the title `"Cafe"` and two navigation links:
        - One to the cart: `Cart (N)` where `N` is the total quantity of all items in the cart.
        - One to a page for creating a menu item.
- Cart item count:
    - Uses the selector `selectCartItemsCount` to calculate the **total quantity** of items in the cart.

```js
export const selectCartItemsCount = (state) => state.cart.items.reduce((currentSum, item) =>
    currentSum + item.quantity
    , 0);
```

4. Asynchronous loading of products using `createAsyncThunk`

`menuSlice`:

- **Reducers:**
    - addItem: Adds a single new item to the menu array.

```js
reducers: {
        addItem(state, action) {
            state.menu.push(action.payload);
        }
    }
```

- **Extra Reducers:** Handles lifecycle states of the `fetchMenu` async action:
    - `pending`: Sets status to `'loading'`.
    - `fulfilled`: Populates `menu` with fetched data and sets status to `'resolved'`.
    - `rejected`: Captures any error and sets status to `'rejected'`.

```js
extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.menu = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
```

The `Menu` component

- When the component mounts, `fetchMenu` (the asynchronous thunk) is dispatched.
- It fetches the list of menu items from the API.

```jsx
 useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);
```

- `status` and `error` are used to display loading or error states.
- `selectMenu` is the selector that retrieves the list of items from the store: `state.menu.menu`.

```jsx
    const { status, error } = useSelector(state => state.menu);
    const menu = useSelector(selectMenu);
```

- Shows loading text or error message if applicable.
- Renders a list of menu item cards using the `MenuCard` component.

```jsx
    <div>
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}

        {menu.map((item) => (
            <MenuCard key={item.id} menuItem={item} />           
        ))}
    </div>
```

```js
export const fetchMenu = createAsyncThunk('menu/fetchMenu', 
    async (_, { rejectWithValue }) => {
        try {
            // Initiating a GET request to the API endpoint
            const response = await fetch('https://67f7f21a2466325443eb595e.mockapi.io/api/menu');

            // Checking if the response is successful
            if (!response.ok) {
                throw new Error('Server Error!'); // Throw an error if the response isn't successful
            }

            // Parsing the response as JSON
            const data = await response.json();

            // Returning the parsed data, which will be handled by the `fulfilled` action
            return data;
        } catch (error) {
            // If there's an error, reject with the error message
            return rejectWithValue(error.message);
        }
    }
);
```

<img src='/src/assets/menu.png'>

The `NewMenuItemForm` is a React component that allows users to create a new menu item for a cafe or restaurant app.

- `Form Handling`: Uses `react-hook-form` for efficient and easy form state management.
- `Validation`: Integrates `Yup` schema-based validation using `yupResolver`.
- `Dynamic Fields`: Supports dynamic input fields for sizes (e.g., small, medium, large) using `useFieldArray`.
- `Redux Integration`: Dispatches the `addMenuItem` action to update the Redux store with the new menu item.
    - `addMenuItem` adds a new menu item by sending a `POST` request to a mock API.
        - Gathers data from the form (`item`) and structures it into menuItem.
        - Sends a `POST` request to the API endpoint.
        - If the request succeeds, parses the JSON and dispatches `addItem` to update the store.
        - If the request fails, returns the error message using `rejectWithValue`.

```js
export const addMenuItem = createAsyncThunk('menu/addMenuItem',
    async (item, { rejectWithValue, dispatch }) => {
        try {
            const menuItem = {
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                category: item.category,
                sizes: item.sizes,
            };

            const response = await fetch('https://67f7f21a2466325443eb595e.mockapi.io/api/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem)
            });

            if (!response.ok) {
                throw new Error("Can't add menu item. Server Error!");
            }

            const data = await response.json();
            dispatch(addItem(data));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
```

- `Navigation`: After submitting the form successfully, the user is redirected to the homepage using `useNavigate`.

<img src='/src/assets/addNewItem.png'>

## ❔The Control Questions

1. What is global state and why is it needed?

Global state refers to data that is shared across multiple components or even the entire application. Managing global state is necessary when different parts of your app need to access the same information, such as user authentication status, shopping cart items, or application-wide settings.

2. What is Redux Toolkit and how does it simplify working with global state?

Redux is a state management library that provides a way to manage global state in JavaScript applications, particularly useful in React applications. It allows developers to manage application state in a predictable manner, making state accessible across components regardless of their location in the component tree.

Understanding the foundational concepts of Redux is crucial for effective state management. The three main concepts are:

- `Store`: The store holds the entire state of the application. It acts as a single source of truth that can be accessed from any component.
- `Actions`: Actions are plain objects that represent an intention to change the state. They must have a type property that indicates the type of action being performed.
- `Reducers`: Reducers are pure functions that take the current state and an action as arguments and return a new state. They determine how the state changes in response to an action.

3. What are slices and how do they help organize the code?

A **slice** is a concept representing a distinct part of the global state along with the logic for updating it. You can think of it as a section of the store responsible for a specific functionality of the application. For example, a **todos** slice for a task list, an **auth** slice for authentication, etc. Each slice is typically created using **createSlice**.

## Source List 

1. [Git Course](https://github.com/MSU-Courses/development-of-web-application-with-react/tree/main/11_Global_Store)
2. [Redux Toolkit](https://medium.com/@shaheermansoor321/understanding-redux-and-redux-toolkit-a-comprehensive-guide-04c63511f3fb#:~:text=Redux%20is%20a%20state%20management,location%20in%20the%20component%20tree.)
3. [Slices](https://redux-toolkit.js.org/api/createSlice)

