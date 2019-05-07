# Kanban (Tasks Breakdown) board Application

### Installation
1) Clone this repository
    ```
    git clone https://github.com/svn1991/progressBoard.git
    ```
2) Npm install "json-server"
    ```
    npm i -g json-server
    ```
3) Run "npm start"
    ```
    npm start
    ```
4) Open browser (chrome preferably) and head over to http://localhost:3000/

### Details

Thw app allows users to split their project into progress statuses and tasks.

######Eg.
| Status        | Tasks           | 
| ------------- | -------------   | 
| To do         | bug fix feature 2 |
| Backlog       | delete feature 1|
| In progress   | create server|
| Testing       | 
| Done          |

In the code, 
1) status are represented by term **categories**
2) tasks are represented by term **cards**

##### JSON format [Database]

3 main categories:
- projectDetails
- columns => categories
- cards

Sample JSON file:

```
{
  "projectDetails": {
    "title": "Test Project 1"
  },
  "columns": [
    {
      "id": 1,
      "title": "Column 1"
    },
    {
      "id": 2,
      "title": "Column 2"
    }
  ],
  "cards": [
    {
      "id": 1,
      "title": "Card 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "columnId": 1
    },
    {
      "id": 2,
      "title": "Card 2",
      "description": "Quisque et pellentesque sem.",
      "columnId": 1
    },
    {
      "id": 5,
      "title": "Card 5",
      "description": "Suspendisse posuere ipsum at dui lacinia, ut faucibus lectus mollis.",
      "columnId": 2
    }
  ]
}
```

#####Conditions

- Cards will only appear on the page if the category (columnId) matches database category (column)
- If a catogory is deleted, all its cards will be deleted automatically
- When adding new card, editing card, adding/editing category or deleting category, no further user actions are allowed unless the current action is saved/discarded.

### TODO:

- make categories/cards consistent rather than column/cards
- Neater description display
- Better drag view
- Smoother drop of cards
- Check out web components functionalities to see if process can be simplified
- Adapt front-end framework for further practice in future
- Understand/Implement server crash handling when ajax requests are sent too soon
- Testing Approach [**Not** implemented yet]
    - Probably use mocha and chai combination to test as its the more familiar testing frameworks
    - Unit testing each function which is meant to return a value
    - Process testing for scenario cycles:
      - Adding new card
      - Editing card
      - Deleting card
      - Adding new category
      - Editing category
      - Deleting category
      - Searching

### Resources

This page contains description and requirements for a Front-End assignment on [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).