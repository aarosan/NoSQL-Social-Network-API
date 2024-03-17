## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Basic Functionality Needed

- Set up Script commands to:
    ```
    - Start the Server
    - Sync the Mongoose models to the MongoDB database
    ```

- Create the following Mongoose models:
    ``` 
    - User
        -username
        -email
        -thoughts (references Thought model)
        -friends (self-reference)

            -Schema Setting(Virtual):
                -friendCount = length of users friends array field on query
                
    - Thought
        -thoughtText
        -createdAt
        -username (user that created this thought)
        -reactions (array of nested documents with the reactionSchema)

            -Schema Setting(Virtual):
                -reactionCount = length of the thought's reactions array field on query

    - Reaction (Schema Only)
        -reactionId
        -reactionBody
        -username (user that created this reaction)
        -createdAt

            -Schema Setting:
                -Will be used as the reaction field's subdocument schema in the Thought model
    ```

- Set up the following GET routes:
    ``` 
    - Users(Include friendCount)
        /api/users
        /api/users/:userId
    - Thoughts(Include reactionCount)
        /api/thoughts
        /api/thoughts/:thoughtId
    ```

- Set up the following POST routes:
    ``` 
    - Users(Include friendCount)
        /api/users/
    - Thought(push the created thought's _id to the associated user's thoughts array field)
        /api/thoughts
    - Reaction
        /api/thoughts/:thoughtId/reactions
    - Friend
        /api/users/:userId/friends/:friendId
    ```

- Set up the following PUT routes:
    ```
    - Users(Include friendCount)
        /api/users/:userId
    - Thought
        /api/thoughts/:thoughtId
    ```

- Set up the following DELETE routes:
    ``` 
    - Users(Include associated thoughts)
        /api/users/:userId
    - Thought
        /api/thoughts/:thoughtId
    - Reaction
        /api/thoughts/:thoughtId/reactions
    - Friend
        /api/users/:userId/friends/:friendId
    ```
