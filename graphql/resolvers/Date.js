import { GraphQLScalarType } from 'graphql';
import moment from "moment";

 const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Defining scalar type Date',
  serialize(value) {
    console.log("serialize...", value)
    // let value;
    // Implement your own behavior here by setting the 'result' variable
    return moment(value, moment.ISO_8601).format("YYYY-MM-DD");
  },
  parseValue(value) {
    console.log("parseValue", value)
    // let value;
    // Implement your own behavior here by setting the 'result' variable
    return moment(value, moment.ISO_8601);
  },
  parseLiteral(ast) {
    console.log("parseLiteral", ast)
    switch (ast.kind) {
      case "StringValue":
        return moment(ast.value, moment.ISO_8601);
      // Implement your own behavior here by returning what suits your needs
      // depending on ast.kind
    }
  }
});

export default Date;