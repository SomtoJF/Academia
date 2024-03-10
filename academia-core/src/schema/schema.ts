const typeDefs = `#graphql 
# Replace this with your own type definitions
scalar Date

enum Role {
  STUDENT
  EXAMINER
}


type User {
  _id: ID!
  email: String!
  firstName: String!
  lastName: String!
  profilePicture: String
  role: Role!
  examsTakenId: [ID!]
  examsTaken: [Exam!]
  examsSetId: [ID!]
  examsSet: [Exam!]
  createdAt: Date!
  updatedAt: Date!
}



type Exam {
  _id: ID!
  inviteId: ID!
  name: String!
  description: String!
  examinerId: ID!
  examiner: User!
  candidates: [User!]
  candidatesId: [ID!]
  submittedIds: [ID!]
  submittedCandidates: [User!]
  objectiveQuestions: [ObjQuestion!]
  theoryQuestions: [TheoryQuestion!]
  due: Date!
  createdAt: Date!
  updatedAt: Date!
}

type ObjQuestion {
  question: String!
  options: [String!]!
  answer: Int!
}

type TheoryQuestion {
  question: String!
  answers: [String!]!
}

input UpdateUserArgs {
  email: String
  firstName: String
  lastName: String
  profilePicture: String
}

input CreateUserArgs {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    profilePicture: String
    role: Role!
}

input ObjInput {
  question: String!
  options: [String!]!
  answer: Int!
}

input TheoryInput {
  question: String!
  answers: [String!]!
}

input CreateExamArgs {
  name: String!
  description: String!
  examinerId: ID!
  objectiveQuestions: [ObjInput!]
  theoryQuestions: [TheoryInput!]
  candidatesId: [ID!]
  due: Date!
}

input UpdateExamArgs {
  name: String
  description: String
  candidatesId: ID
  submit: ID
}

type Mutation {
  createUser(edits: CreateUserArgs!): User
  updateUser(id: ID!, edits: UpdateUserArgs!): User
  deleteUser(id: ID!): User

  updateExam(id: ID!, edits: UpdateExamArgs!): Exam
  createExam(edits: CreateExamArgs!): Exam
  deleteExam(id: ID!): Exam
}

type Query {
  user(id: ID!): User

  exam(id: ID!): Exam
  examByInvite(inviteId: ID!) : Exam
}`;

export default typeDefs;
