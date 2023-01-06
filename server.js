import express from 'express'
import {graphqlHTTP}  from 'express-graphql'
import { GraphQLSchema,GraphQLObjectType,GraphQLString } from 'graphql'

const app = express();

const Schema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'HelloWorld',
        fields : () => ({
            message : {
                type : GraphQLString,
                resolve : () => 'hey hello world'
            },
            name : {
                type : GraphQLString,
                resolve : () => 'test name'
            }
        })
    })
}); 

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema : Schema
}));

app.listen(3000);