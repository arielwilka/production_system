"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import {createRole, Role } from "../data/RoleData";
import roleData from "../contexts/DataProvider";
import { Button } from "@/components/ui/button";
export default function RoleCreateComponent(){
    const [newRole, setNewRole] = useState<Role>({
        role_id: '',
        name: '',
        is_enable: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmitRole = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createRole(newRole);
        setIsLoading(false);
        setNewRole({
            role_id: '',
            name: '',
            is_enable: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        });
        router.refresh();
        setIsOpen(false);
    };
    const handleModal = () => {
        setIsOpen(!isOpen);
    };
    return(
        <div>
            <Button onClick={handleModal}>Add New</Button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Role</h3>
                    <form onSubmit={handleSubmitRole}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Role Name"
                                className="input input-bordered"
                                value={newRole.name}
                                onChange={(e) =>
                                    setNewRole({
                                        ...newRole,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-control mt-6">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Loading..." : "Create"}
                            </Button>
                        </div>
                    </form>
                    <div className="modal-action">
                        <Button onClick={handleModal}>Cancel</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}