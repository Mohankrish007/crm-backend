import {moduleHandler} from '../../handlers/user-management/module-handler.mjs'; // Adjust path as necessary

const moduleController = async (req, res) => {
    const { method, body, params } = req;
    const { id } = params;
    console.info(req);
    try {
        switch (method) {
            case 'POST':
                console.info(req); // Log data for debugging
                const createdModule = await moduleHandler.createModule(body);
                res.status(201).json(createdModule);
                break;
            case 'GET':
                if (id) {
                    const module = await moduleHandler.getModuleById(id);
                    res.json(module);
                } else {
                    const modules = await moduleHandler.getAllModules();
                    res.json(modules);
                }
                break;
            case 'PATCH':
                const updatedModule = await moduleHandler.updateModule(id, body);
                res.json(updatedModule);
                break;
            case 'DELETE':
                const deleteModule = await moduleHandler.deleteModule(id);
                res.json(deleteModule);
                break;
            default:
                res.status(404).json({ error: 'Method not supported' });
        }
    } catch (error) {
        console.error('Error handling module:', error);
        res.status(500).json({ error: error.message });
    }
};

export { moduleController };