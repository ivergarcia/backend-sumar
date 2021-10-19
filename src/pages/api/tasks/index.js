import { dbConnect } from 'utils/mongoose';
import Task from 'models/Task';

dbConnect()
export default async function handler(req, res) {

  const { body, method } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newTask = new Task(body);
        const saveTask = await newTask.save();
        return res.status(201).json(saveTask);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({msg: 'This method is not supported'});
  }

}