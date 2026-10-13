import { useState, useEffect } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
}

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

const mockResponse: ApiResponse<User[]> = {
    success: true,
    data: [
        {
            id: 1,
            username: "Sarah",
            email: "sarah@example.com",
            isActive: true,
        },
        {
            id: 2,
            username: "Alex",
            email: "alex@example.com",
            isActive: false,
        },
        {
            id: 3,
            username: "Jordan",
            email: "jordan@example.com",
            isActive: true,
        },
    ],
};

interface UserCardProps {
    user: User;
    onToggle: (userId: number) => void;
}

const UserCard = ({ user, onToggle }: UserCardProps) => {
    return (
        <li>
            <span>{user.username}</span>
            <span>{user.email}</span>
            <span>{user.isActive ? "Active" : "Inactive"}</span>
            <button onClick={() => onToggle(user.id)}>
                {user.isActive ? "Deactivate" : "Activate"}
            </button>
        </li>
    );
};

const UserDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const toggleIsActive = (userId: number) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, isActive: !user.isActive };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    useEffect(() => {
        function fetchData(response: ApiResponse<User[]>) {
            try {
                if (response.success) {
                    setUsers(response.data);
                } else {
                    throw new Error(response.error);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    setError(error.message);
                }
            }
        }
        fetchData(mockResponse);
    }, []);

    return (
        <>
            {error && <span>{error}</span>}
            {!error && !users.length && <span>No Users Found</span>}
            {!error && users.length && (
                <ul>
                    {users.map((user) => {
                        return (
                            <UserCard
                                key={user.id}
                                user={user}
                                onToggle={toggleIsActive}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default UserDashboard;
