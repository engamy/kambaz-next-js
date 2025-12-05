"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../client";

export default function People() {
  interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    section?: string;
    role?: string;
    loginId?: string;
    lastActivity?: string;
    totalActivity?: string;
    [key: string]: unknown;
  }

  const [users, setUsers] = useState<User[]>([]);
  const { cid } = useParams();

  const fetchUsers = async () => {
    if (cid) {
      const courseUsers = await client.findUsersForCourse(String(cid));
      setUsers(courseUsers || []);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

