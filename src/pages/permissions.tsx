import { useEffect, useState } from "react";
import { IRole } from "../interface/roles";
import { Link } from "react-router-dom";
import { getRoles } from "../api/roles";

const Permissions = () => {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchData();
  }, []);
  return (
    <div className="lg:mr-60 ">
      <h1 className="my-10 text-2xl font-semibold ml-3">Permissions</h1>

      <div className="w-full ">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-center">Name Roles</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr className="bg-white border-b text-center" key={index}>
                    <td className="px-6 py-4 text-left">{index + 1}</td>
                    <td className="px-6 py-4">{role.name}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/permissions/${role.id}`}
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                      >
                        Edit Permissions
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
