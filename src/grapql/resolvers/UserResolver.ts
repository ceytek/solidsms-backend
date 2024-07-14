import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../types/User";
import { Role } from "../types/Role";
import pool from '../../db';
import bcrypt from 'bcryptjs';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("customer_id") customer_id: number,
    @Arg("role_id") role_id: number
  ): Promise<User> {
    // Rol kontrolü
    const [roleRows] = await pool.query('SELECT * FROM roles WHERE id = ?', [role_id]);
    if ((roleRows as Role[]).length === 0) {
      throw new Error('Geçersiz rol ID.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, name, customer_id, role_id };

    const [result] = await pool.query(
      'INSERT INTO users (username, password, name, customer_id, role_id) VALUES (?, ?, ?, ?, ?)', 
      [user.username, user.password, user.name, user.customer_id, user.role_id]
    );

    const insertedId = (result as any).insertId;
    return { id: insertedId, ...user };
  }

  @Query(() => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
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
