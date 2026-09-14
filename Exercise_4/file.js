const fs = require('fs')

const createFile = async (fileName, content) => {
    try {
        await fs.promises.writeFile(fileName, content)
        console.log("File created successfully")
    } catch (err) {
        console.error("Error creating file: ", err)
    }
}

const readFile = async (fileName) => {
    try {
        const data = await fs.promises.readFile(fileName, 'utf-8')
        console.log("Content file: ", data)
        return data
    } catch (err) {
        console.error("Error reading file: ", err)
    }
}

const appendToFile = async (fileName, content_append) => {
    try {
        await fs.promises.appendFile(fileName, 'n\This is additional content');
        console.log(`Content appended to file '${fileName}' successfully`);
    } catch (err) {
        console.error(`Error appending to file '${fileName}':`, err);
    }
}
const deleteFile = async (filename) => {
    try {
        await fs.promises.unlink(filename);
        console.log(`File '${filename}' deleted successfully`);
    } catch (err) {
        console.error(`Error deleting file '${filename}': `, err);
    };
}

module.exports = { createFile, readFile, appendToFile, deleteFile }