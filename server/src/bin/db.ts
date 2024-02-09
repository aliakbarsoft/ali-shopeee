import bcrypt from "bcryptjs";
import schemaUser from "../controllers/User/schema";
import {
  ConfirmForgetPass,
  CreateUser,
  IChangePassword,
  IUser,
} from "../interfaces/user";
import { ResultSetHeader, RowDataPacket, coreSchema, query } from "./mysql";
import { IProducts } from "interfaces/categories";

// User
export async function getUserByEmail(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM  posts.users
  WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function createNewUser(data: any) {
  const password = data.password;
  const confirmNewPassword = data.confirmNewPassword;
  const fdPassword = { password, confirmNewPassword };
  const validPassword = schemaUser.createPassword.validateSyncAt(
    "confirmNewPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);

  const result = await query<ResultSetHeader>(
    "INSERT INTO users (firstName,lastName, email, password, verify_code) VALUES (?, ?, ?, ?, ?)",
    {
      values: [
        data.firstName,
        data.lastName,
        data.email,
        hash,
        data.verify_code,
      ],
    }
  );
  return result;
}

export async function getUserByPassword(email: string, password: string) {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM  ${coreSchema}.users
  WHERE email=?`,
    {
      values: [email],
    }
  );
  if (user.length < 1) return null;
  else {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user[0].password, function (err, isMatch) {
        if (err) reject(err);
        resolve(isMatch);
      });
    }).then((result) => {
      return user[0] as IUser;
    });
  }
}

export async function getUserByGoogleId(googleid: string) {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM  ${coreSchema}.users
  WHERE google_id=?`,
    {
      values: [googleid],
    }
  );
  if (user.length < 1) return null;
  else return user[0] as IUser;
}

export async function getUserById(id: string) {
  const userId = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE id`,
    { values: [id] }
  );
  if (userId.length < 1) return null;
  else return userId[0] as IUser;
}

export async function checkUserExist(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `
  SELECT email
  FROM  ${coreSchema}.users
  WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function updateUserVerifyCode(userId: string, newCode: string) {
  const result = await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET verify_code=?,updatedAt=?
    WHERE email=?
  `,
    {
      values: [newCode, new Date(), userId],
    }
  );
  const user = await query<RowDataPacket[]>(
    `
  SELECT id,email,verify_code
  FROM  ${coreSchema}.users
  WHERE id=?`,
    {
      values: [userId],
    }
  );
  return user[0] as CreateUser;
}

export async function confirmForgetPass(data: ConfirmForgetPass) {
  const result = await query<RowDataPacket[]>(
    `
  SELECT *
  FROM  ${coreSchema}.users
  WHERE email=? AND deletedAt IS NULL
  `,
    {
      values: [data.email, data.verify_code],
    }
  );
  if (result.length < 1) return { status: 1, message: "email is not valid" };
  const user = result[0] as IUser;
  if (user.verify_code !== data.verify_code)
    return { status: 5, message: "the code is not valid !" };
  await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET allow_change_pass=1,updatedAt=?
    WHERE id=?
  `,
    {
      values: [new Date(), user.id],
    }
  );
  return { status: 6, message: "code is correct" };
}

export async function changeAccountPasswordByEmail(data: IChangePassword) {
  const result = await query<RowDataPacket[]>(
    `
  SELECT *
  FROM  ${coreSchema}.users
  WHERE email=? AND deletedAt IS NULL
  `,
    {
      values: [data.email],
    }
  );
  if (result.length < 1)
    return { status: 1, message: "email is not valid !", userId: "" };
  const user = result[0] as IUser;
  if (!user.allow_change_pass)
    return { status: 2, message: "password is not changable !", userId: "" };
  const newPassword = data.newPassword;
  const confirmNewPassword = data.confirmNewPassword;
  const fdPassword = { newPassword, confirmNewPassword };
  const validPassword = schemaUser.createPassword.validateSyncAt(
    "confirmNewPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);
  await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET allow_change_pass=0,password=?,autoLogin=1,updatedAt=?
    WHERE id=?
  `,
    {
      values: [hash, new Date(), user.id],
    }
  );
  return {
    status: 3,
    message: "password changed successfully",
    userId: user.id,
  };
}

export async function getAllProducts() {
  const getProduct = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.category`
  );
  if (getProduct.length < 1) return null;
  else return getProduct;
}

export async function createProduct(data: IProducts) {
  const result = await query<ResultSetHeader>(
    "INSERT INTO products.product (product_name,price,description) VALUES (?,?,?)",
    {
      values: [data.product_name, data.price, data.description],
    }
  );
  return result;
}
