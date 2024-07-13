import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../types/Customer";
import pool from '../../db'; // Adjust the path as necessary

@Resolver()
export class CustomerResolver {
  @Query(() => [Customer])
  async getCustomers(): Promise<Customer[]> {
    const [rows] = await pool.query('SELECT * FROM customers');
    return rows as Customer[];
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Arg("name") name: string,
    @Arg("isCorporate") isCorporate: boolean
  ): Promise<Customer> {
    const customer = { name, isCorporate };

    const [result] = await pool.query(
      'INSERT INTO customers (name, isCorporate) VALUES (?, ?)', 
      [customer.name, customer.isCorporate]
    );

    const insertedId = (result as any).insertId;
    return { id: insertedId, ...customer };
  }
}
