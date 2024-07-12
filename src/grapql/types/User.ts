import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  customer_id: number;

  constructor(id: number, username: string, password: string, name: string, customer_id: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.customer_id = customer_id;
  }
}
