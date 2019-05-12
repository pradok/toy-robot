# Toy Robot Simulator

### Installation
```
$ npm install
```

### Run tests
```
$ npm test
```

### Run the simulator
```
$ npm start
```

## Assumptions/notes
1. If Robot is placed out of boundary, it'll be implicitly placed at 0,0
2. Covered most of the essential non-happy path scenarios, not comprehensively tested for all possible errors
3. Move command is not executed if Robot is going out of boundary as one of the requirements was to ignore the fall, hence nothing is prompted to the user.
4. No tests written for function in index.js
