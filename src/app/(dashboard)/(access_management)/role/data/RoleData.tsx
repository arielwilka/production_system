// RoleData.ts
export type RoleData = {
  roles: Role[] | undefined;
  createRole: (role: Role) => Promise<Role>;
  updateRole: (role: Role) => Promise<Role>;
  deleteRole: (role_id: string) => Promise<boolean>;
  listRoles: () => Promise<Role[]>;
};

export interface Role {
  role_id: string;
  name: string;
  is_enable: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export const createRole = async (role: Role): Promise<Role> => {
  try {
    // Make an API call to create a new role and return the created role
    const response = await fetch('http://localhost:3000/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to create role');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};

export const updateRole = async (role: Role): Promise<Role> => {
  try {
    // Make an API call to update the role with the given ID and return the updated role
    const response = await fetch(`http://localhost:3000/api/roles/${role.role_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to update role');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};

// export const deleteRole = async (role: Role): Promise<Role> => {
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
export const deleteRole = async (role_id: string): Promise<boolean> => {
  try {
    // Make an API call to delete the role with the given ID
    const response = await fetch(`http://localhost:3000/api/roles/${role_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return true;
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to delete role');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};


export const listRoles = async (roleData: RoleData): Promise<Role[]> => {
  try {
    // Make an API call to fetch a list of roles
    const response = await fetch('http://localhost:3000/api/roles', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store' // Move the cache option inside the options object
});

    if (response.ok) {
      const roles = await response.json();
      roleData.roles = roles["data"]; // Update the roles in RoleData
      return roles;
    } else {
      // Handle error if the API call is not successful
      throw new Error('Failed to retrieve roles');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};
