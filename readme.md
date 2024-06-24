# Directory Tree Challenge

## Description

This project is a solution to the Directory Tree Challenge, which involves creating, moving, and deleting directories based on a series of commands.

## Requirements

- Node.js

## Setup

1. Clone the repository
2. Run npm install
3. Run the script using the following command `node main.js`


# TEST
In order to run test run the following command (make sure to have run npm install first)
1. npm test

# NOTES

1. If you want to run something diff please make sure to change 'commands'.
2. Not specified on create scenario what would happen if we try to create a folder that already exist. ( the following code would be able to handle this with some other minor changes )
   
    create(path) {
        const parts = path.split('/');
        let current = this;
        for (const part of parts) {
        if (!current.subdirectories[part]) {
            current.subdirectories[part] = new Directory(part);
            return true;
        } else if (part === parts[parts.length - 1]) {
            console.log(`Cannot create ${path} - it already exists`);
            return false;
        }
        current = current.subdirectories[part];
        }
    }
3. 