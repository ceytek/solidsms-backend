import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../types/User";
import pool from '../../db';
import bcrypt from 'bcryptjs';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("customer_id") customer_id: number
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, name, customer_id };

    const [result] = await pool.query(
      'INSERT INTO users (username, password, name, customer_id) VALUES (?, ?, ?, ?)', 
      [user.username, user.password, user.name, user.customer_id]
    );

    const insertedId = (result as any).insertId;
    return { id: insertedId, ...user };
  }

  @Query(() => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = (rows as User[])[0];
    
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }

    return user;
  }
}
