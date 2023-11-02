// RoleData.ts
import {User} from "@prisma/client";
import { Role } from "../../role/data/RoleData";
export type UserData = {
  user: User[] | undefined;
  createUser: (user: User) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
  deleteUser: (userId: string) => Promise<boolean>;
  listUser: () => Promise<UserRead[]>;
};

export interface UserRead {
  user_id: string;
  name: string;
  gender: string;
  username: string;
  password: string;
  is_enable: boolean;
  role_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  role: {
      name: string
  }
}

export const createUser = async (user: User): Promise<User> => {
  try {
    // Make an API call to create a new role and return the created role
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to create user');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};

export const updateUser= async (user: User): Promise<User> => {
  try {
    // Make an API call to update the role with the given ID and return the updated role
    const response = await fetch(`http://localhost:3000/api/user/${user.user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to update user');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};

// export const deleteRole = async (role: User): Promise<User> => {
//   try {
//     // Make an API call to delete the role with the given ID
//     const response = await fetch(`http://localhost:3000/api/roles/${role.role_id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       return true;
//     } else {
//       // Handle error if the API call is not successful
//       throw new Error('Failed to delete role');
//     }
//   } catch (error) {
//     // Handle any network or other errors
//     throw error;
//   }
// };

export const deleteUser = async (userId: { userId: string }): Promise<boolean> => {
  try {
    // Make an API call to delete the role with the given ID
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'DELETE',
    });

    // Add a return statement that returns a boolean value
    return response.ok;
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};

export const listUser = async (userData: UserData): Promise<UserRead[]> => {
  try {
    // Make an API call to fetch a list of roles
    const response = await fetch('http://localhost:3000/api/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store' // Move the cache option inside the options object
});

    if (response.ok) {
      const user = await response.json();
      //console.log(roles["data"]);
      userData.user = user["data"]; // Update the roles in RoleData
      return user;
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to retrieve user');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};


export { User };

