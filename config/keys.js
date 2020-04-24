module.exports = {
    mongoURI: 'mongodb+srv://Quang:ok132@cluster0-eehbp.mongodb.net/test?retryWrites=true&w=majority'
};

//Keys file used to store mongoURI, found from connection -> string on MondoDB.Atlas
//Each module = seperate file  -> used to break the application into mult. files
// module.exports allows whatever is in it to be used outside of this file -> outside of this scope

// URI moved to default.json since we want this to be secret 

// NOTE, delete when push to production