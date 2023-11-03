// UserData.ts
export type UserData = {
    users: User[] | undefined;
    createRole: (user: User) => Promise<User>;
    updateRole: (user: User) => Promise<User>;
    deleteRole: (user: string) => Promise<boolean>;
    listRoles: () => Promise<User[]>;
  };
  
  export interface User{
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
  role:{
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
  
  export const updateUser = async (user: User): Promise<User> => {
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
  
  export const deleteUser = async (user_id: string): Promise<boolean> => {
    try {
      // Make an API call to delete the role with the given ID
      const response = await fetch(`http://localhost:3000/api/user/${user_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        return true;
      } else {
        // Handle error if the API call is not successful
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      // Handle any network or other errors
      throw error;
    }
  };
  
  
  export const listUser = async (userData: UserData): Promise<User[]> => {
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
        const users = await response.json();
        userData.users = users["data"]; // Update the roles in UserData
        return users;
      } else {
        // Handle error if the API call is not successful
        throw new Error('Failed to retrieve user');
      }
    } catch (error) {
      // Handle any network or other errors
      throw error;
    }
  };
  