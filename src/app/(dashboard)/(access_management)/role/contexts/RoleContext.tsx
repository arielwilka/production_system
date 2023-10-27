// RoleContext.ts
import React, { createContext, useContext, ReactNode } from 'react';
// import { RoleData } from '../data/RoleData'; // Import the RoleData type
import { RoleData } from '../data/RoleData';
// Define the RoleContextProps type
interface RoleContextProps {
  roleData: RoleData;
  children: ReactNode;
}

const RoleContext = createContext<RoleData | undefined>(undefined);

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

export function RoleProvider({ roleData, children }: RoleContextProps) {
  return (
    <RoleContext.Provider value={roleData}>
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContext;