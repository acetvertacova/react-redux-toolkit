# Lab Work №3: Hooks and Lists Rendering.

## Installation and Project Launch Instructions

### Setting up the working environment

1. Download and install the latest or stable version of **Node.js**.

2. Check the installation of **Node.js** and **NPM** by running the following commands in the terminal:

    `node -v`
    
    `npm -v`

3. Navigate to the project folder and start the development server with `npm run dev`.

## Lab's Description

This project provides hands-on experience with React hooks and dynamic rendering of lists. You'll learn how to manage state with `useState`, `useEffect`, create reusable components, and handle user interactions in a React application. The implementation of search functionality and cart management provides a good foundation for building more complex e-commerce applications in the future.

## Project Structure

     src/
      │── assets/
      │── layouts/
      │   │── MainLayout.jsx
      │── components/
      │   │── Footer.jsx
      │   │── Header.jsx
      │   │── MenuCard.jsx
      │   │── Menu.jsx
      │   │── Search.jsx
      │   │── Slider.jsx
      │── data/
      │   │── menu.json
      │── pages/
      │   │── AboutPage.jsx
      |   │── CartPage.jsx
      |   │── NotFoundPage.jsx
      |   │── ProductPage.jsx
      │── App.jsx
      │── main.jsx
      |── ...

## Usage Examples

### `Header`

Displays the main title of the app ("Cafe"). Provides navigation links to jump to the 'Slider' and 'Filter' sections. This component will make it easier for users to navigate the application, especially when you want to jump between different sections like the slider or filtering options. Styled with background color, drop shadow, and transition effects for hover states.

<img src="/public/header.png">

### `Footer`

Displays a copyright notice with the developer's name and GitHub link. The GitHub link opens in a new tab.Styled with a background color, shadow, and transition effects for the hover state on the link.

<img src="/public/footer.png">


### `Slider`

The `Slider` component displays a menu item with navigation buttons to cycle through items. It automatically cycles through the menu items every 3 seconds.

```jsx
    const [index, setIndex] = useState(0); // useState hook to track the current menu item index

    function nextMenuItem() {
        if (index < menu.length - 1) {
            setIndex(index + 1);
        }
    }

    function previosMenuItem() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    let currentSlide = menu[index];

    //useEffect with setInterval to handle automatic cycling
        useEffect(() => {
                const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % menu.length);
                }, 3000);
            
    //Properly cleans up the interval when the component unmounts to prevent memory leaks
                return () => {
                clearInterval(interval);
                };
            }, []);
```
<img src="/public/slider.png">

### `Search`

The `Search` component allows users to input a search query to filter items. It calls the onSearch function when the user types in the search input.

<img src="/public/search.png">

```jsx
    const [search, setSearch] = useState(""); //useState hook to track and update the search input value

        const handleSearchChange = (e) => {
            setSearch(e.target.value);
            onSearch(e.target.value); //onSearch callback function as a prop to communicate search input changes to parent components
        };

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <input id="filter"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                value={search}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:border-[#493D9E] text-gray-700"
            />
        </div>
    );
```
<img src="/public/search-in-work.png">


### `MenuItemList`

The `MenuItemList` component displays a list of menu items with a search feature. It filters the list of menu items based on the search query provided by the user.

```jsx

// Uses two state variables - one for the original menu items and another for the filtered results
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

// Loads menu data from a JSON file and initializes both state variables with this data when the component mounts
    useEffect(() => {
        setMenuItems(menuJson);
        setFilteredMenuItems(menuJson);
      }, []);

// Implements a handleSearch function that filters menu items based on the user's search query, matching item names case-insensitively
      const handleSearch = (query) => {
        setFilteredMenuItems(menuItems.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
        }));
      };

      return(

    <div>
        <Search onSearch={handleSearch} />
        {filteredMenuItems.map((menuItem) => (
            <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}

    </div>
    )
```

### `MenuItemCard`

The `MenuItemCard` component displays an individual menu item with options for selecting a size and adding it to the cart. It shows the item’s image, name, description, price, and available sizes.

```jsx
// Accepts a menuItem object containing item details like name, image, description, price, and sizes
    export default function MenuItemCard({ menuItem }) {

// useState to track the selected size, defaulting to the first size in the array
    const [selectedSize, setSize] = useState(menuItem.sizes[0]); 

// Implements handleSizeChange function to update the selected size when a size button is clicked
    const handleSizeChange = (size) => {
        setSize(size);
    };
...

```

## The Control Questions

1. **How to use `useState` for managing state?**

The useState Hook is a built-in React Hook that allows functional components to manage state. It returns an array with two elements: the current state value and a function to update that state. State updates in useState can be done by calling the setter function. In fact, we tell React to store the value of the variable and respond to its changes by re-rendering the component.

`const [state, setState] = useState(initialState)`

- `state`: It is the value of the current state.
- `setState`: It is the function that is used to update the state.
- `initialState`: It is the initial value of the state.

2. **How does the `useEffect` work?**

The useEffect in React is used to handle the side effects such as fetching data and updating DOM. This hook runs on every render but there is also a way of using a dependency array using which we can control the effect of rendering. The useEffect hook is vital for managing side effects in functional components.

``` 
    useEffect(() => {
        // Side effect logic goes here
        return () => {
            // Cleanup logic (optional)
    };
    }, [dependencies]);

```

- `Effect function`: This is where your side effect code runs.
- `Cleanup function`: This optional return function cleans up side effects like subscriptions or timers when the component unmounts.
- `Dependencies array`: React re-runs the effect if any of the values in this array change.

3. **Which method can be used to render lists of items in React?**

To render lists in React use method `map`. The `.map()` method allows you to run a function on each item in the array, returning a new array as the result. 

For example: 

```jxs
    const myArray = ['apple', 'banana', 'orange'];
    const myList = myArray.map((item) => <p>{item}</p>)
```

**Key usage:** 

Keys are necessary for React to correctly track changes in the list. This is important for optimizing the Virtual DOM's performance and preventing unnecessary re-renders. Two main rules for keys:

- Keys must be unique within the list.
- Keys should not change over time.

For example: 

```jsx
    const languages = ['English', 'Spanish', 'Romanian'];

    <ul>
        {frameworks.map((framework) => (
          <li key={framework}>{framework}</li>
        ))}
    </ul>

```

## Source List 

1. [useState](https://www.geeksforgeeks.org/reactjs-usestate-hook/)
2. [useEffect](https://www.geeksforgeeks.org/reactjs-useeffect-hook/)
3. [map()](https://www.w3schools.com/REACT/react_es6_array_methods.asp)
4. [Git Course](https://github.com/MSU-Courses/development-of-web-application-with-react/tree/main)
