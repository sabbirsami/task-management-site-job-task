import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { useQuery } from "react-query";
import { FiPlusSquare } from "react-icons/fi";
import Task from "./Task";

const ManageTasks = () => {
    const {
        data: tasks = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: "tasks",
        queryFn: () =>
            fetch("http://localhost:5000/tasks")
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
                <div className="">
                    <h6 className="font-medium">TaskTo tasks board</h6>
                    <p className="opacity-70 font-light text-sm">
                        Create and complete and manage your tasks using TaskTo
                        task board.
                    </p>
                </div>
                <div className="">
                    <Link to={"/management/add-task"}>
                        <button className="bg-white text-black text-sm px-5 py-3 rounded-md font-bold">
                            <FiPlusSquare className="inline mb-1 me-2 text-xl" />{" "}
                            Add Task
                        </button>
                    </Link>
                </div>
            </div>
            <div className="grid md:grid-cols-3 lg:gap-6 gap-2  mt-6">
                <div>
                    <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                        <LuListTodo className="text-2xl" />{" "}
                        <h2 className="">To Do Tasks</h2>
                    </div>
                    <div className="mt-8">
                        {tasks.map(
                            (task) =>
                                task.status === "to-do" && (
                                    <Task
                                        key={task._id}
                                        refetch={refetch}
                                        task={task}
                                    />
                                )
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                        <MdOutlineCallMissedOutgoing className="text-2xl" />{" "}
                        <h2 className="">Ongoing Tasks</h2>
                    </div>
                    <div className="mt-8">
                        {tasks.map(
                            (task) =>
                                task.status === "ongoing" && (
                                    <Task
                                        key={task._id}
                                        refetch={refetch}
                                        task={task}
                                    />
                                )
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                        <MdOutlineFileDownloadDone className="text-2xl" />{" "}
                        <h2 className="">Complete Tasks</h2>
                    </div>
                    <div className="mt-8">
                        {tasks.map(
                            (task) =>
                                task.status === "complete" && (
                                    <Task
                                        key={task._id}
                                        refetch={refetch}
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
