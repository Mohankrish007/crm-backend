import {permissionHandler} from '../../handlers/user-management/permission-handler.mjs'; // Adjust path as necessary

const permissionController = async (req, res) => {
    const { method, body, params } = req;
    const { permissionId } = params;
    try {
        switch (method) {
            case 'POST':
                const createdPermission = await permissionHandler.createPermission(body);
                res.status(201).json(createdPermission);
                break;
            case 'GET':
                if (permissionId) {
                    const permission = await permissionHandler.getPermissionById(permissionId);
                    res.json(permission);
                } else {
                    const permissions = await permissionHandler.getAllPermissions();
                    res.json(permissions);
                }
                break;
            case 'PATCH':
                const updatePermission = await permissionHandler.updatePermission(permissionId, body);
                res.json(updatePermission);
                break;
            case 'DELETE':
                const deletePermission = await permissionHandler.deletePermission(permissionId);
                res.json(deletePermission);
                break;
            default:
                res.status(404).json({ error: 'Method not supported' });
        }
    } catch (error) {
        console.error('Error handling permission:', error);
        res.status(500).json({ error: error.message });
    }
};

export { permissionController };