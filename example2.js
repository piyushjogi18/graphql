import express from 'express'
import {graphqlHTTP}  from 'express-graphql'
import { GraphQLSchema,GraphQLObjectType,GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql'

const app = express();

const books = [
    {id:1,name:'test1',authorId:1},
    {id:2,name:'test2',authorId:3},
    {id:3,name:'test3',authorId:1},
    {id:4,name:'test4',authorId:2}
];

const authors = [
    {id:1,name:'author1'},
    {id:2,name:'author2'},
    {id:3,name:'author3'}
];

const BookType = new GraphQLObjectType({
    name : 'book',
    description : 'this is book structure',
    fields : ()=>({
        id : {type:GraphQLNonNull(GraphQLInt)},
        name : {type:GraphQLNonNull(GraphQLString)},
       // authorId : {type:GraphQLNonNull(GraphQLInt)},
        authorName : {
            type : GraphQLNonNull(GraphQLString),
            resolve : (book) => authors.find(author=>author.id===book.authorId).name 
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'author',
    description : 'this is author structure',
    fields : ()=>({
        id : {type:GraphQLNonNull(GraphQLInt)},
        name : {type:GraphQLNonNull(GraphQLString)},
        books : {
            type : new GraphQLList(BookType),
            resolve : (author) => books.filter(book=>book.authorId===author.id)
        }
    })
});

const schema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Query',
        description : 'test',
        fields : () => ({
            books : {
                type : new GraphQLList(BookType),
                resolve : () => books
            },
            authors : {
                type : new GraphQLList(AuthorType),
                resolve : () => authors
            }
        })
    })
});

app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql : true
}));

app.listen(3000);