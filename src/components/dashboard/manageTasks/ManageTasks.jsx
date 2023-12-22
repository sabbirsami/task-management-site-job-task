import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { useQuery } from "react-query";
import { FiPlusSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import Task from "./Task";

const ManageTasks = () => {
    const {
        data: tasks = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: "tasks",
        queryFn: () =>
            fetch("https://task-management-server-cyan-omega.vercel.app/tasks")
                .then((res) => res.json())
                .then((data) => data),
    });

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    console.log(tasks);
    return (
        <section className="text-white p-6 w-full">
            {/* header section  */}
            <div className="md:flex justify-between items-end border-b pb-6 border-white/50">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=""
                >
                    <h6 className="font-medium">TaskTo tasks board</h6>
                    <p className="opacity-70 font-light text-sm">
                        Create and complete and manage your tasks using TaskTo
                        task board.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className=""
                >
                    <Link to={"/management/add-task"}>
                        <button className="bg-white text-black text-sm px-5 py-3 rounded-md font-bold">
                            <FiPlusSquare className="inline mb-1 me-2 text-xl" />{" "}
                            Add Task
                        </button>
                    </Link>
                </motion.div>
            </div>
            <div className="grid md:grid-cols-3 lg:gap-6 gap-2  mt-6">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md"
                    >
                        <LuListTodo className="text-2xl" />{" "}
                        <h2 className="">To Do Tasks</h2>
                    </motion.div>
                    <div className="mt-8">
                        {tasks.map(
                            (task, idx) =>
                                task.status === "to-do" && (
                                    <Task
                                        idx={idx}
                                        key={task._id}
                                        refetch={refetch}
                                        task={task}
                                    />
                                )
                        )}
                    </div>
                </div>

                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md"
                    >
                        <MdOutlineCallMissedOutgoing className="text-2xl" />{" "}
                        <h2 className="">Ongoing Tasks</h2>
                    </motion.div>
                    <div className="mt-8">
                        {tasks.map(
                            (task, idx) =>
                                task.status === "ongoing" && (
                                    <Task
                                        idx={idx}
                                        key={task._id}
                                        refetch={refetch}
                                        task={task}
                                    />
                                )
                        )}
                    </div>
                </div>

                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md"
                    >
                        <MdOutlineFileDownloadDone className="text-2xl" />{" "}
                        <h2 className="">Complete Tasks</h2>
                    </motion.div>
                    <div className="mt-8">
                        {tasks.map(
                            (task, idx) =>
                                task.status === "complete" && (
                                    <Task
                                        key={task._id}
                                        refetch={refetch}
                                        idx={idx}
                                        task={task}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageTasks;
