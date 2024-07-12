import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean) 
  isCorporate: boolean; 

  constructor(id: string, name: string, isCorporate: boolean) {
    this.id = id;
    this.name = name;
    this.isCorporate = isCorporate;
  }
}
