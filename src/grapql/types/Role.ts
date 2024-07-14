import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Role {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
