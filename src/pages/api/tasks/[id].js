import { dbConnect } from 'utils/mongoose';
import Task from 'models/Task';

dbConnect();

export default async (req, res) => {
    const { method, body, query: { id } } = req;
    switch ( method ) {
        case "GET":
            try {
                const task = await Task.findById(id);
                if(!task) return  res.status(404).json({ msg: 'Task not found' });
                return res.status(200).json(task);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        case "PUT":
            try {
                const task = await Task.findByIdAndUpdate(id, body, { new: true });
                if(!task) return res.status(404).json({ msg: "Task not can be updated, why not exists the id" });
                return res.status(200).json(task);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        case "DELETE":
            try {
                const task = await Task.findByIdAndDelete(id);
                if(!task) return  res.status(404).json({msg: "Task not cant be deleted, why not exists the id"});
                return res.status(200).json({msg: "Task deleted successfully"});
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
}