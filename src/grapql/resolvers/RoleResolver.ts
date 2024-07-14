import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../types/Role";
import pool from '../../db'; // Adjust the path as necessary

@Resolver()
export class RoleResolver {
  @Query(() => [Role])
  async getRoles(): Promise<Role[]> {
    const [rows] = await pool.query('SELECT * FROM roles');
    return rows as Role[];
  }

  @Mutation(() => Role)
  async createRole(
    @Arg("name") name: string
  ): Promise<Role> {
    const role = { name };

    const [result] = await pool.query(
      'INSERT INTO roles (name) VALUES (?)', 
      [role.name]
    );

    const insertedId = (result as any).insertId;
    return { id: insertedId, ...role };
  }
}
