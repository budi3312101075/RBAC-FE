import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPermissions, updatePermissions } from "../api/permissions";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

const ChangePermission = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const { roleId } = useParams<{ roleId: string }>();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getPermissions(roleId!);
        setPermissions(data);
      } catch (err) {
        console.log("Error fetching permissions:", err);
      }
    };

    if (roleId) {
      fetchPermissions();
    }
  }, [roleId]);

  const handleCheckboxChange = (
    moduleId: string,
    permissionType: string,
    value: boolean
  ) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((category) => ({
        ...category,
        listModules: category.listModules.map((module: any) =>
          module.id === moduleId
            ? { ...module, [permissionType]: value ? 1 : 0 }
            : module
        ),
      }))
    );
  };

  const handleSave = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Saved !",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updatePermissions(roleId!, permissions);
          Swal.fire({
            title: "Success!",
            text: `${response.message}`,
            icon: "success",
          });
        }
      });
    } catch (err) {
      console.log("Error updating permissions:", err);
    }
  };

  return (
    <div className="lg:mr-60 ">
      <h1 className="my-10 text-2xl font-semibold ml-3">Change Permissions</h1>

      <div className="w-full">
        {permissions.map((category) => (
          <div key={category.categoryId} className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {category.categoryName}
            </h2>

            {category.listModules.map((module: any) => (
              <div key={module.id} className="mb-4 border p-4 rounded">
                <h3 className="font-semibold mb-2">Module: {module.name}</h3>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={module.canRead === 1}
                      onChange={(e) =>
                        handleCheckboxChange(
                          module.id,
                          "canRead",
                          e.target.checked
                        )
                      }
                    />
                    Can Read
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={module.canCreate === 1}
                      onChange={(e) =>
                        handleCheckboxChange(
                          module.id,
                          "canCreate",
                          e.target.checked
                        )
                      }
                    />
                    Can Create
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={module.canUpdate === 1}
                      onChange={(e) =>
                        handleCheckboxChange(
                          module.id,
                          "canUpdate",
                          e.target.checked
                        )
                      }
                    />
                    Can Update
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={module.canDelete === 1}
                      onChange={(e) =>
                        handleCheckboxChange(
                          module.id,
                          "canDelete",
                          e.target.checked
                        )
                      }
                    />
                    Can Delete
                  </label>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ChangePermission;
